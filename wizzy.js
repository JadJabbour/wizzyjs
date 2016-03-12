(function(){
	var wizzy = function(opts){

		if(opts.length == 0){
			return {
				error: 'Wizzy cannot initialize without options'
			}
		}

		if(opts['backstage'] && document.getElementById(opts['backstage'])){
			this.backstage = document.getElementById(opts['backstage']);
		}
		else{
			return {
				error: '"backstage" could not initialize'
			}
		}

		if(opts['stage'] && document.getElementById(opts['stage'])){
			this.stage = document.getElementById(opts['stage']);
		}
		else{
			return {
				error: '"stage" could not initialize'
			}
		}

		if(opts['first'] && document.getElementById(opts['first'])){
			this.first = document.getElementById(opts['first']);
		}
		else{
			return {
				error: '"first" could not initialize'
			}
		}

		if(opts['control_class'] && document.getElementsByClassName(opts['control_class']).length > 0){
			this.control_list = document.getElementById(opts['control_class']);
		}
		else{
			return {
				error: '"control" could not initialize'
			}
		}

		this.currentScreen = null;
		this.dataStack = [];

		this.init = function(){
			for(var i=0;i<this.control_list.length;i++){
				this.control_list[i].addEventListener("click", function(){
					this.collectStepAndLoadNext(this);
				});
			}
			this.loadStep(this.first);
		}

		this.collectStepAndLoadNext = function(el){
			var stepData = el.getAttribute('data-source').split(';');
			var nextStep = el.getAttribute('data-next');
			if(this.fetchStepData(stepData)){
				this.loadStep(nextStep);
			}
			else{
				alert('Corrupt data source!');
				//location.reload();
			}
		}

		this.loadStep = function(el){
			this.stage.appendChild(el);
			if(this.currentScreen != null){
				this.runWizardEvent(this.currentScreen.getAttribute('data-unload'));
			}
			this.runWizardEvent(el.getAttribute('data-unload'));
			currentScreen = el;
		}

		this.fetchStepData = function(dataSource){
			var key;
			var value;
			if(dataSource.length != 0){
				for(var i=0;i<dataSource.length;i++){
					key = dataSource[i];
					if(document.getElementById(key)){
						this.saveWizardStepData(key, document.getElementById(key).value);
					}
				}
				return true;
			}
			else{
				return false;
			}
		}

		this.runWizardEvent = function(){
			
		}
	}
})();
//DATA- Attributes Legend
/*
data-load="function_name" => place on the top container of a screen
*/
//initializing example:
/*
var Wizard_1 = wizzy({
	backstage: 'div wrapping all the hidden screens',
	stage: 'div where the current screen would be displayed',
	first: 'div wrapping the first screen/content list',
	control_class: 'class given to any button on the current screen that should trigger the wizard next'
});
if(Wizard_1.error){
	console.log('an error has occured: ' + Wizard_1.error);
}


var Wizard_2 = wizzy({
	backstage: '',
	stage: '',
	first: '',
	control_class: ''
});
if(Wizard_1.error){
	console.log('an error has occured: ' + Wizard_1.error);
}
*/