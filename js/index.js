var rightKey, leftKey, topKey, bottomKey;

$(document).ready(function () {

	//Set up the triggers for the arrow keys
	$(document).keydown(function(e){
		if (e.keyCode == 37 && typeof leftKey === 'function') {
			leftKey();
		} else if(e.keyCode == 38 && typeof topKey === 'function') {
			topKey();
		} else if(e.keyCode == 39 && typeof rightKey === 'function') {
			rightKey();
		} else if(e.keyCode == 40 && typeof bottomKey === 'function') {
			bottomKey();
		}
	});

	parallax.add($("#index"))
			.add($("#map"))
			/*.add($("#density"))
			.add($("#race"))
			.add($("#age"))
			.add($("#columbia"))
			.add($("#conclusion"));*/

	parallax.background = $("body");

	//Clears each page navigation on load
	parallax.preload = function(){
		rightKey = leftKey = topKey = bottomKey = "";
		$(".control").hide();
	};

	if (!window.location.hash.split('#')[1]){ var tHash = "index"; }
	else{ var tHash = window.location.hash.split('#')[1]; }
    hasLoad = {'index':false};
	//Setting up page navigation
	parallax.index.onload=function(){
		hash("index");
		if (!hasLoad['index'] && tHash != 'index'){ createChart("chartdiv"); hasLoad['map'] = true; }
		setRight("map", "");
	};

   hasLoad = {'map':false};
   
   parallax.map.onload=function(){
		hash("map");
		if (!hasLoad['map'] && tHash != 'map'){ createMap('map-container'); hasLoad['map'] = true; }
		setLeft("index", "");
	};

/*	parallax.thirtyyears.onload=function(){
		hash("thirtyyears");
		setLeft("history", "");
		setRight("density", "");
	};
	
	hasLoad = {'pop':false, 'race':false, 'age':false};
	parallax.density.onload=function(){
		hash("density");
		//if (!hasLoad['pop'] && tHash != 'density'){ createMap('pop'); hasLoad['pop'] = true; }
		setLeft("thirtyyears", "");
		setRight("race", "");
	};
	parallax.race.onload=function(){
		hash("race");
		//if (!hasLoad['race'] && tHash != 'race'){ createMap('race'); hasLoad['race'] = true; }
		setLeft("density", "");
		setRight("age", "");
	};
	parallax.age.onload=function(){
		hash("age");
		//if (!hasLoad['age'] && tHash != 'age'){ createMap('age'); hasLoad['age'] = true; }
		setLeft("race", "");
		setRight("columbia", "");
	};
	parallax.columbia.onload=function(){
		hash("columbia");
		setLeft("age", "");
		setRight("conclusion", "");
	};
	parallax.conclusion.onload=function(){
		hash("conclusion");
		setLeft("columbia", "");
	};
*/
	

	//Sets the correct triggers for the arrows, plus arrow keys
	function setRight(page, text){
		$("#rightText").text(text);
		$("#rightControl").show().unbind('click').click(function(){
			parallax[page].right();
		});
		rightKey = function(){
			parallax[page].right();
		};
	}

	function setLeft(page, text){
		$("#leftText").text(text);
		$("#leftControl").show().unbind('click').click(function(){
			parallax[page].left();
		});
		leftKey = function(){
			parallax[page].left();
		};
	}

	function setTop(page, text){
		$("#topText").text(text);
		$("#topControl").show().unbind('click').click(function(){
			parallax[page].top();
		});
		topKey = function(){
			parallax[page].top();
		};
	}

	function setBottom(page, text){
		$("#bottomText").text(text);
		$("#bottomControl").show().unbind('click').click(function(){
			parallax[page].bottom();
		});
		bottomKey = function(){
			parallax[page].bottom();
		};
	}

	//The fadey bits
	$("#bottomControl").mouseenter(function(){
		$("#bottomArrow").fadeTo(500,1);
		$("#bottomText").fadeTo(500,1);
	}).mouseleave(function(){
		$("#bottomArrow").stop().fadeTo(500,0.2);
		$("#bottomText").stop().fadeTo(500,0);
	});

	$("#leftControl").mouseenter(function(){
		$("#leftArrow").fadeTo(500,1);
		$("#leftText").fadeTo(500,1);
	}).mouseleave(function(){
		$("#leftArrow").stop().fadeTo(500, 0.2);
		$("#leftText").stop().fadeTo(500,0);
	});

	$("#rightControl").mouseenter(function(){
		$("#rightArrow").fadeTo(500,1);
		$("#rightText").fadeTo(500,1);
	}).mouseleave(function(){
		$("#rightArrow").stop().fadeTo(500, 0.2);
		$("#rightText").stop().fadeTo(500,0);
	});

	$("#topControl").mouseenter(function(){
		$("#topArrow").fadeTo(500,1);
		$("#topText").fadeTo(500,1);
	}).mouseleave(function(){
		$("#topArrow").stop().fadeTo(500, 0.2);
		$("#topText").stop().fadeTo(500,0);
	});


	$(".control").hide();
	
	// Initiate HighCharts
	//BarChartWard();
	//LineChart();
	//percentageChangeBarChart();
	
	parallax[tHash].show();
	
	if (tHash == 'map'){ createMap('map-container'); hasLoad['map'] = true; }
	if (tHash == 'index') {hasLoad['index'] = true;}

});

function hash(string){
	window.location.hash = string;
}