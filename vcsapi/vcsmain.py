from flask import Flask,request

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