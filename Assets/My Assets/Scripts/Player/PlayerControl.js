var speed : float = 15;
var rotation : float = 5;
var jumpForce : float = 10;
var gravityForce : float = 10;
var bullet : GameObject;
var Health : float = 10;
var healthUI : GameObject;
var shot : AudioClip;
private var mySpeed;
//Player Controls. In seperate functions for fast changes.
function Friction(){
	this.GetComponent(Rigidbody).velocity.z *= 0.9; //Friction.
	this.GetComponent(Rigidbody).velocity.x *= 0.9; //Friction.	
}
function Movement(){
	if(Input.GetAxis("Vertical")){
		this.GetComponent(Rigidbody).AddForce(this.transform.forward *Input.GetAxis("Vertical") * mySpeed,ForceMode.VelocityChange);
	}
}
function Rotation(){
	if(Input.GetAxis("Horizontal")){
		this.transform.Rotate(Vector3(0,Input.GetAxis("Horizontal") * rotation,0),Space.World);
	}
}
function Jumping(){
	if(Physics.Raycast(this.transform.position, -this.transform.up, 1)){
		if(Input.GetButtonDown("Dodge")){
			this.GetComponent(Rigidbody).AddForce(this.transform.up * jumpForce);
			this.GetComponent(Rigidbody).AddForce(this.transform.forward * 100);
		}
	}
}
function Gravity(){ //Are the default physics, really this bad? The drag is ridiculous.
	//I forgot about my friction script. I'm a retard.
	if(!Physics.Raycast(this.transform.position, -this.transform.up, 1)){
		this.GetComponent(Rigidbody).velocity.y-=gravityForce;
	}
}
function Fire(){
	if(Input.GetButton("Jump")){
		mybullet = Instantiate(bullet,this.transform.position,Quaternion.identity);
		Physics.IgnoreCollision(mybullet.GetComponent(Collider),this.GetComponent(Collider));
		mybullet.GetComponent(Rigidbody).AddForce(this.transform.forward * 1000);
		if(!this.GetComponent(AudioSource).isPlaying){
			this.GetComponent(AudioSource).clip = shot;
			this.GetComponent(AudioSource).Play();
		}
	}
}
function KillThis(){
	this.gameObject.name = "DEAD";
	this.gameObject.tag = "Untagged";
	this.GetComponent(Rigidbody).constraints = RigidbodyConstraints.None;
	this.enabled = false;
}
function Sprint(){
	if(Input.GetButton("Sprint")){
		mySpeed = speed*2;
	}
	else{
		mySpeed = speed;
	}
}
function Update () {
	if(Time.deltaTime > 0 ){
		Friction();
	}
	healthUI.GetComponent(UI.Slider).value = Health;
	if(Health <= 0){
		KillThis();
	}
	Movement();
	Rotation();
	Sprint();
	Jumping(); //Now official the "Dodge". Lazy.
	Fire();
	if(this.transform.position.y < -1.5){ //Lazy hotfix
		this.transform.position.y = -1.4;
	}
}
function OnCollisionEnter(otherobj : Collision){
	if(otherobj.gameObject.tag == "Bullet"){
		Health-=otherobj.gameObject.GetComponent(Rigidbody).velocity.sqrMagnitude/200;
	}
}