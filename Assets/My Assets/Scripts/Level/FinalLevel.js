function Start () {
	if(GameObject.FindWithTag("Arrow")){
		GameObject.FindWithTag("Arrow").GetComponent("LookAtFinish").target = this.gameObject;
	}
}