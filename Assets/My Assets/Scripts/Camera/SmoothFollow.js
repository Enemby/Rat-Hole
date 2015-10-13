var target : GameObject;
@Range (0.01f,15.0f)
var scrollSpeed : float = 10;
function SmoothFollow(){
	var actualspeed : float;
	actualspeed = Vector3.Distance(Vector3(this.transform.position.x,0,this.transform.position.z),Vector3(target.transform.position.x,0,target.transform.position.z))*scrollSpeed;
	if(target.transform.position.z > this.transform.position.z){
		this.transform.position.z+=actualspeed * Time.deltaTime;
	}
	if(target.transform.position.z < this.transform.position.z){
		this.transform.position.z-=actualspeed * Time.deltaTime;
	}
	if(target.transform.position.x > this.transform.position.x){
		this.transform.position.x+=actualspeed * Time.deltaTime;
	}
	if(target.transform.position.x < this.transform.position.x){
		this.transform.position.x-=actualspeed * Time.deltaTime;
	}
}
function Update () {
	if(target != null){
		SmoothFollow();
	}
}