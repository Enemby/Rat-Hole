//Procedural generation is hard. The player and camera script was literally 10 minutes. and now I've been here for more than an hour.
	//Prepare for a tale of woe, and too much trust in my past self.
	//I have no idea what I'm doing. Prefabricated Grid Procedural generation seems to be... underdocumented?
	//I don't know if I'm just stupid or not at this point.
	//Oh. My. God. I just wasted 4-5 consecutive hours on this crap.
	//I was doing the nested loop correctly, but there was a bug in TileFound(). I hate my life.
	//On the bright side, I learned more about for loops than any reasonable person would, now.
var amount : int = 15;
var roomSize : int = 12;
var room : GameObject;
var startRoom : GameObject;
var emptyRoom : GameObject;
var finalRoom : GameObject;
var finalroomspawned : boolean = false;
var clearpath : boolean = true;
var zheight : int = 30;
var updateTime : float = 5;
function tileFound(myx,myz){
	var rooms : GameObject[] = GameObject.FindGameObjectsWithTag("Room");
 	var found : boolean = false;
	for(var i : int;i < rooms.Length;i++){
		if(rooms[i].transform.position.x == myx && rooms[i].transform.position.z == myz){
			found = true;
		}
	}
	if(found == true){
		return true;
	}
	else{
		return false;
	}
}
function SpawnTile(myx,myz){
	if(tileFound(myx,myz) == false){
		Instantiate(room,Vector3(myx,0,myz),Quaternion.identity);
	}
}
function getfinalRoomPos(){
	var rooms : GameObject[] = GameObject.FindGameObjectsWithTag("Room");
 	var found : boolean = false;
 	var myz : int = 48;
	for(var i : int;i < rooms.Length;i++){
		if(rooms[i].transform.position.z > myz && rooms[i].transform.position.z > this.transform.position.z){
			myz = rooms[i].transform.position.z;
		}
		if(i >= rooms.Length && myz > 30){
			found = true;
		}
	}
	if(found == true){
		if(myz > this.transform.position.z && myz > 36){
			return myz+roomSize;
		}
		else{
			return 36;
		}
	}
}
function clearPathtoFinalRoom(){
	for(var z : int = 5; z < getfinalRoomPos(); z++){
			var hit : RaycastHit;
		for(var x : int = 5; x < 30;x++){
			var hit2 : RaycastHit;
			if(Physics.Raycast(Vector3(x,1,z),Vector3.forward,hit2)){
				if(hit2.collider.gameObject.name == "Wall"){
					Destroy(hit2.collider.gameObject); //There's probably a better way to do this.
				}
			}
		}
		if(Physics.Raycast(Vector3(x,1,z),Vector3.right,hit)){
				if(hit.collider.gameObject.name == "Wall"){
					Destroy(hit.collider.gameObject); //There's probably a better way to do this.
				}
		}
	}
}
function generateLevel(){
	for(var x : int; x < this.transform.position.x/roomSize+4;x+=1){
		for(var z : int; z < this.transform.position.z/roomSize+4;z+=1){
				if(z*roomSize > zheight){
					zheight = z*roomSize;
				}
				SpawnTile(x*roomSize,z*roomSize);
		}
	}
	if(finalroomspawned == false && Time.timeSinceLevelLoad > 15){
		if(!tileFound(36,zheight+roomSize)){
			Instantiate(finalRoom,Vector3(36,0,zheight+roomSize),Quaternion.identity);
			finalroomspawned = true;
		}
	 } 
}
function startGrid(){
		Instantiate(startRoom,Vector3(0,0,0),Quaternion.identity);
		Instantiate(emptyRoom,Vector3(roomSize,0,0),Quaternion.identity);
		Instantiate(emptyRoom,Vector3(0,0,roomSize),Quaternion.identity);
		Instantiate(emptyRoom,Vector3(roomSize,0,roomSize),Quaternion.identity);
	for(var x : int; x < amount;x+=1){
		for(var z : int; z < amount;z+=1){
				SpawnTile(z*roomSize,x*roomSize);
		}
	}
}
function clearPlayerPath(){
	var hit : RaycastHit;
	if(Physics.Raycast(Vector3(0,1,0),Vector3.forward,hit)){
		if(hit.collider.gameObject.name == "Wall"){
			Destroy(hit.collider.gameObject); //There's probably a better way to do this.
		}
	}
	var hit2 : RaycastHit;
	if(Physics.Raycast(Vector3(5,1,0),Vector3.right,hit2)){
		if(hit2.collider.gameObject.name == "Wall"){
			Destroy(hit2.collider.gameObject); //There's probably a better way to do this.
		}
	}
}
function Start(){
	startGrid();
	InvokeRepeating("generateLevel",2,updateTime); //We'll only call the "generateLevel" every 5 seconds.
	clearPlayerPath();
}
function Update(){
		//generateLevel(); //We don't want to call this every frame :)
	if(finalroomspawned == true && clearpath == false){
		clearPathtoFinalRoom();
		clearpath = true;
		clearPathtoFinalRoom(); //Just to be sure.
		clearPathtoFinalRoom(); //REALLY SURE.
	}
}