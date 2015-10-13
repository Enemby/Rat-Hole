var target : GameObject;
function Update () {
	if(target != null){
		this.transform.LookAt(Vector3(target.transform.position.x,target.transform.position.y,target.transform.position.z));
	}

}