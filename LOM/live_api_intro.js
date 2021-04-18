inlets = 1;
outlets = 1;

var api = new LiveAPI();

function countTracks()
{
	api.path = 'live_set';
    tc = api.getcount('tracks');
	post("Du hast " + tc + " Tracks");
}

function getName(){    
    api.path = 'live_set tracks ' + 2 + " clip_slots " + 0 + ' clip';
    post("MIDI Clip Name =" + api.get("name") + "\n");
}

function fireClip(){
	api.path = 'live_set tracks ' + 2 + " clip_slots " + 1 + ' clip';
	api.call('fire') ;
}
