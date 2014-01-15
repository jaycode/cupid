if (typeof Effect == 'undefined')
  throw("You must have the script.aculo.us library to use this accordion");

var Accordion = Class.create({

  initialize: function(id, options, defaultExpandedCount) {
    if(!$(id)) throw("Attempted to initalize accordion with id: "+ id + " which was not found.");
    this.accordion = $(id);
    this.duration = 0.75;
    this.options = Object.extend({
      toggleClass: "accordion-toggle",
      toggleActive: "accordion-toggle-active",
      contentClass: "accordion-content"
    }, options || {});
    this.contents = this.accordion.select('.'+this.options.contentClass);
    this.isAnimating = false;
    this.heights = []; // heights of all elements
    if (defaultExpandedCount) {
      this.current = this.contents[defaultExpandedCount-1];
      this.currentPos = defaultExpandedCount-1;
    }
    else {
      this.contents[0];
      this.currentPos = 0;
    }
    this.toExpand = null;

    this.setHeights();
    this.initialHide();
    if (defaultExpandedCount) {
      this.attachInitialHeight();
    }

    var clickHandler =  this.clickHandler.bindAsEventListener(this);
    this.accordion.observe('click', clickHandler);
  },

  expand: function(el) {
    this.toExpand = el.next('.'+this.options.contentClass);
    if(this.current != this.toExpand){
    this.toExpand.show();
    this.animate();
    }
  },
  
  shrink: function(el) {
    console.log('shrink pressed');
    var toShrink = el.next('.'+this.options.contentClass);
    options = {
      sync: true,
      scaleContent: false,
      transition: Effect.Transitions.sinoidal,
      scaleX: false,
      scaleY: true
    };

    var effects = new Array();
    effects.push(new Effect.Scale(toShrink, 0, options));
    
    new Effect.Parallel(effects, {
      duration: this.duration,
      fps: 35,
      queue: {
        position: 'end',
        scope: 'accordion'
      },
      beforeStart: function() {
        this.isAnimating = true;
        toShrink.previous('.'+this.options.toggleClass).removeClassName(this.options.toggleActive);
      }.bind(this),
      afterFinish: function() {
        toShrink.hide();
        this.current = null;
        this.isAnimating = false;
      }.bind(this)
    });
  },

  setHeights: function() {
    for(var i=0; i<this.contents.length; i++) {
    this.contents[i].index = i;
    this.heights[i] = this.contents[i].getHeight();
    }
  },

  attachInitialHeight: function() {
  this.current.previous('.'+this.options.toggleClass).addClassName(this.options.toggleActive);
    if(this.current.getHeight() != this.heights[this.current.index]) this.current.setStyle({height: this.heights[this.current.index]+"px"});
  },

  clickHandler: function(e) {
    var el = e.element();
    // if active, shrink
    if(el.hasClassName(this.options.toggleActive) && !this.isAnimating) {
    this.shrink(el);
    }
    else {
    // if not active, expand
    if(el.hasClassName(this.options.toggleClass) && !this.isAnimating) {
      this.expand(el);
    }
    }
  },

  initialHide: function(){
    for(var i=0; i<this.contents.length; i++){
      if(this.contents[i] != this.current) {
        this.contents[i].hide();
        this.contents[i].setStyle({height: 0});
      }
    }
  },

  animate: function() {
    var effects = new Array();
    var options = {
      sync: true,
      scaleFrom: 0,
      scaleContent: false,
      transition: Effect.Transitions.sinoidal,
      scaleMode: {
        originalHeight: this.heights[this.toExpand.index],
        originalWidth: this.accordion.getWidth()
      },
      scaleX: false,
      scaleY: true
    };

    effects.push(new Effect.Scale(this.toExpand, 100, options));
    if (this.current != null) {
      options = {
        sync: true,
        scaleContent: false,
        transition: Effect.Transitions.sinoidal,
        scaleX: false,
        scaleY: true
      };

      effects.push(new Effect.Scale(this.current, 0, options));
    }

    new Effect.Parallel(effects, {
      duration: this.duration,
      fps: 35,
      queue: {
        position: 'end',
        scope: 'accordion'
      },
      beforeStart: function() {
        this.isAnimating = true;
        if (this.current != null) {
          this.current.previous('.'+this.options.toggleClass).removeClassName(this.options.toggleActive);
        }
        this.toExpand.previous('.'+this.options.toggleClass).addClassName(this.options.toggleActive);
      }.bind(this),
      afterFinish: function() {
        if (this.current != null) {
          this.current.hide();
        }
        this.current = this.toExpand;
        this.toExpand.setStyle({ height: this.heights[this.toExpand.index]+"px" });
        this.isAnimating = false;
      }.bind(this)
    });
  }

});