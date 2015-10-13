function Start(){
	if(Random.value <= 0.75){
		Destroy(this.gameObject);
	}
	else{
		Destroy(this);
	}
}