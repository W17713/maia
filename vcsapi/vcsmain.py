from flask import Flask,request,jsonify
import shutil
import os

app = Flask(__name__)

@app.route('/api/v1/filevcs', methods=["GET","POST"])
def filevcs():
    if request.method=="POST":
        content = request.get_json()
        userid =content["userdata"]["userid"]
        topic=content["userdata"]["topic"]
        file = open(userid[16:24]+"_"+topic+".txt","a")
        for i in range(len(content["userdata"]["data"])):
            file.write(content["userdata"]["data"]["key"+str(i+1)]["dat"]+"\n")        
        file.close
        return request.json
    return 'filevcs'

def move(source,destination,filename):
    cwd = os.getcwd()
    ext='.txt'
    print(format(cwd))
    shutil.move(cwd+source+filename+ext,cwd+destination+filename+ext)
    return 'success'

@app.route('/api/v1/add', methods=["POST"])
def mount():
    filename=request.args.get('name')
    move('\\files\\','\\staged\\',filename)
    return 'done'


@app.route('/api/v1/commit',methods=["POST"])
def commit():
    filename=request.args.get('name')
    move('\\staged\\','\\commit\\',filename)
    return 'done'


@app.route('/api/v1/status',methods=["POST"])
def status():
    cwd=os.getcwd()
    stagepath=cwd+'\\staged\\'
    commitpath=cwd+'\\commit\\'
    stagedfiles=os.listdir(stagepath)
    commitfiles=os.listdir(commitpath)
    return jsonify(committed_files=commitfiles,staged_files=stagedfiles)


