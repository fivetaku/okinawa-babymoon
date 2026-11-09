#!/usr/bin/env python3
"""Dify 챗플로 답변 품질 평가. difyctl test로 각 케이스를 돌려 must/must_not 키워드와 분기 여부를 채점한다.
사용: python3 run_eval.py --app-id <id> [--workers 5] [--out results.json]"""
import json, subprocess, argparse, concurrent.futures as cf, os, re, time
D=os.path.expanduser("~/.local/bin/difyctl")
def norm(s): return re.sub(r"[\s,]","",s)
def run(case,app):
    t=time.time()
    p=subprocess.run([D,"test","console_app","advanced_chat","--app-id",app,"--query",case["q"]],capture_output=True,text=True,timeout=240)
    try: j=json.loads(p.stdout)
    except Exception: return {**case,"ok":False,"err":"nonjson:"+p.stdout[:200]+p.stderr[:200],"sec":round(time.time()-t,1)}
    ans=(j.get("text") or {}).get("answer","") if isinstance(j.get("text"),dict) else str(j.get("text",""))
    na=norm(ans)
    miss=[k for k in case["must"] if norm(k) not in na]
    bad=[k for k in case["must_not"] if norm(k) in na]
    anyof=case.get("any_of"); any_ok=(not anyof) or any(norm(k) in na for k in anyof)
    if not any_ok: miss=miss+["any_of:"+"|".join(anyof)]
    return {**case,"answer":ans,"missing":miss,"forbidden_hit":bad,"ok":not miss and not bad,"tokens":j.get("total_tokens"),"sec":round(time.time()-t,1),"status":j.get("status")}
if __name__=="__main__":
    ap=argparse.ArgumentParser(); ap.add_argument("--app-id",required=True); ap.add_argument("--workers",type=int,default=5); ap.add_argument("--cases",default=os.path.join(os.path.dirname(__file__),"cases.json")); ap.add_argument("--out",default=None)
    a=ap.parse_args(); cases=json.load(open(a.cases))
    with cf.ThreadPoolExecutor(a.workers) as ex: res=list(ex.map(lambda c: run(c,a.app_id),cases))
    passed=sum(r["ok"] for r in res)
    print(f"PASS {passed}/{len(res)}")
    for r in res:
        flag="OK " if r["ok"] else "FAIL"
        print(f"{flag} {r['id']:16s} {r.get('sec','?'):>5}s  miss={r.get('missing',r.get('err'))} forb={r.get('forbidden_hit')}")
    if a.out: json.dump(res,open(a.out,"w"),ensure_ascii=False,indent=1)
