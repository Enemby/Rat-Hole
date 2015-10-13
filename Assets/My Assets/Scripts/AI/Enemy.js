//ENEMIES :D
var player : GameObject;
//var waitTime : float = 0.4;
var bullet : GameObject;
function Start () {
	player = GameObject.FindWithTag("Player");
}
function Fire(myWait){
	this.transform.LookAt(player.transform.position);
	mybullet = Instantiate(bullet,this.transform.position,Quaternion.identity);
	Physics.IgnoreCollision(mybullet.GetComponent(Collider),this.GetComponent(Collider));
	mybullet.GetComponent(Rigidbody).AddForce(this.transform.forward * 1000);
	yield WaitForSeconds(myWait);
}
function KillThis(){
	Destroy(this.gameObject,5);
	this.GetComponent(ParticleSystem).enableEmission = false;
	this.enabled = false;
}
function Update(){
	if(player != null && player.gameObject.name != "DEAD"){
		if(Vector3.Distance(this.transform.position,player.transform.position) <= 50 && Time.timeSinceLevelLoad < 2){
			Destroy(this.gameObject); //Making sure no enemies spawn shooting in front of the player.
		}
		if(Vector3.Distance(this.transform.position,player.transform.position) < 100){
			var hit : RaycastHit;
			if(Physics.Linecast (this.transform.position,GameObject.Find("Player").transform.position, hit)){
				if(hit.collider.gameObject.tag == "Player"){
					Fire(1-PlayerPrefs.GetFloat("Difficulty"));
				}
			}
		 }
	}
}
function OnCollisionEnter(otherobj : Collision){
	if(otherobj.gameObject.tag == "Bullet"){
		KillThis();
	}
}