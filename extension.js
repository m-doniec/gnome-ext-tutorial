const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const GLib = imports.gi.GLib;

let panelButton, panelButtonText, timeout;
let ticks = 0;
let started = false;

function setButtonText() {
  log('setButtonText'+ticks.toString())
  ticks += 1;
  panelButtonText.set_text(ticks.toString());

  return true;
}

function init(){
  panelButton = new St.Bin({
    style_class: "panel-button"
  });

  panelButtonText = new St.Label({
    style_class: "examplePanelText",
    text: "starting..."
  });

  panelButton.set_child(panelButtonText);

  start(true);
}

function reset(){
  if(started){
    log('1st extension STOPPING...')
    Mainloop.source_remove(timeout);
    started = false;
    ticks = 0;
  }
}

function start(fromInit){
  if(!started){
    log('1st extension STARTING... fromInit: ' + fromInit.toString())
    timeout = Mainloop.timeout_add(1000, setButtonText);
    started = true;
  }
}

function enable(){
  Main.panel._rightBox.insert_child_at_index(panelButton, 1);
  start(false);
}

function disable(){
  Main.panel._rightBox.remove_child(panelButton);
  reset();
}

//debug check
//journalctl -n 1000 --no-pager | grep '1st extension'
