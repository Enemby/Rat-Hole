function optimization(){
	yield WaitForSeconds(2);
	Destroy(this.gameObject);
}
function Start () {
	optimization();
}