var JQ = JQ || {};

JQ.Transition = Ember.Mixin.create({
  cssProperties: ['background', 'backgroundAttachment', 'backgroundColor', 'backgroundImage', 'backgroundPosition',
  'backgroundRepeat', 'border', 'borderBottom', 'borderBottomColor', 'borderBottomStyle', 'borderBottomWidth',
  'borderColor', 'borderLeft', 'borderLeftColor', 'borderLeftStyle', 'borderLeftWidth', 'borderRight', 'borderRightColor',
  'borderRightStyle', 'borderRightWidth', 'borderStyle', 'borderTop', 'borderTopColor', 'borderTopStyle', 'borderTopWidth',
  'borderWidth', 'clear', 'clip', 'color', 'cursor', 'display', 'filter', 'font', 'fontFamily', 'fontSize',
  'fontVariant', 'fontWeight', 'height', 'left', 'letterSpacing', 'lineHeight', 'listStyle', 'listStyleImage',
  'listStylePosition', 'listStyleType', 'margin', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'overflow',
  'padding', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop', 'pageBreakAfter', 'pageBreakBefore',
  'position', 'styleFloat', 'textAlign', 'textDecoration', 'textIndent', 'textTransform', 'top', 'verticalAlign',
  'visibility', 'width', 'zIndex','rotate','scale','skewX','skewY','translate','rotate3d','x','y'],

  // When Ember creates the view's DOM element, it will call this
  // method.
  didInsertElement: function() {
    this._super();
    this._gatherProperties();
  },

  // When Ember tears down the view's DOM element, it will call
  // this method.
  willDestroyElement: function() {
    this._super();

    // Tear down any observers that were created to make jQuery UI
    // options available as Ember properties.
    var observers = this._observers;
    for (var prop in observers) {
        if (observers.hasOwnProperty(prop)) {
          this.removeObserver(prop, observers[prop]);
        }
    }

  },

  _gatherProperties: function() {
    var cssProperties = this.get('cssProperties');

    // The view can specify a list of jQuery UI options that should be treated
    // as Ember properties.
    cssProperties.forEach(function(key) {

      // Set up an observer on the Ember property. When it changes,
      // call jQuery UI's `setOption` method to reflect the property onto
      // the jQuery UI widget.
      var observer = function() {
        this.animate();
      };

      this.addObserver(key, observer);

      // Insert the observer in a Hash so we can remove it later.
      this._observers = this._observers || {};
      this._observers[key] = observer;
    }, this);

  },

  animate: function(){
      var cssProperties = this.get('cssProperties'), properties = {},
        duration = this.get('duration') || 0, easing = this.get('easing') || null, self = this;

      // Gather css properties values
      cssProperties.forEach(function(key) {
        properties[key] = self.get(key);
      }, this);

      // Before animation
      if(typeof this.beforeAnimate == "function"){
          this.beforeAnimate();
      }

      // Animation
      this.$().transition(properties, duration, function(){
          if(typeof self.afterAnimate == "function"){
            self.afterAnimate();
          }
      });
  },

  setCSSProperties: function(properties){
      if ( this.state !== 'inDOM' ){
          Ember.run.next(this, function() {
            this.setCSSProperties(properties);
          });
      } else {
          this.setProperties(properties);
      }
  }
});