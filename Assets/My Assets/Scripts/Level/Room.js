//Quick and dirty optimization.
var player : GameObject;
var enemy : GameObject;
function Start () {
	player = GameObject.FindWithTag("Player");
	if(Random.value < PlayerPrefs.GetFloat("Difficulty")-0.05 && enemy != null){
		myenemy = Instantiate(enemy,this.transform.position,Quaternion.identity);
		myenemy.transform.parent = this.transform;
	}
}
function Update () {
	if(player != null){
		if(Vector3.Distance(this.transform.position,player.transform.position) > 100 && this.transform.GetChild(0).GetComponent(Renderer).isVisible == false){
			Destroy(this.gameObject);
		}
	}
}