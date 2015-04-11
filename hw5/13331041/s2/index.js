// Generated by LiveScript 1.3.1
(function(){
  var Button, addClickingToAllButtons, addClickingToBigButtons, addClickingToAtButton, resetAllWhenLeaving, resetAllWhenEntering, BigButton, AtButton;
  Button = (function(){
    Button.displayName = 'Button';
    var prototype = Button.prototype, constructor = Button;
    Button.buttons = [];
    Button.disableOtherButtons = function(thisButton){
      var i$, ref$, len$, button, results$ = [];
      for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
        button = ref$[i$];
        if (button !== thisButton && button.state !== 'done') {
          results$.push(button.disable());
        }
      }
      return results$;
    };
    Button.enableOtherButtons = function(thisButton){
      var i$, ref$, len$, button, results$ = [];
      for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
        button = ref$[i$];
        if (button !== thisButton && button.state !== 'done') {
          results$.push(button.enable());
        }
      }
      return results$;
    };
    Button.resetAll = function(){
      var i$, ref$, len$;
      this.index = 0;
      for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
        (fn$.call(this, ref$[i$]));
      }
      function fn$(button){
        button.reset();
      }
    };
    Button.allButtonsClicked = function(){
      var i$, ref$, len$, button;
      for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
        button = ref$[i$];
        if (button.state !== 'done') {
          return false;
        }
      }
      return true;
    };
    Button.index = 0;
    Button.clickOneByOne = function(){
      this.disableOtherButtons(this.buttons[this.index]);
      this.buttons[this.index].clicked();
      this.getNumberOneByOne(this.buttons[this.index]);
    };
    Button.getNumberOneByOne = function(button){
      var this$ = this;
      return $.get('/haha', function(number, status){
        if (button.state === 'clicked') {
          this$.enableOtherButtons(button);
          button.done();
          button.showNumberInBallon(number);
          BigButton.count(number);
          if (this$.allButtonsClicked() === true) {
            BigButton.changeBigButtonState();
            $('#info-bar').click();
          } else {
            this$.index = this$.index + 1;
            this$.clickOneByOne();
          }
        }
      });
    };
    function Button(dom){
      var this$ = this;
      this.dom = dom;
      this.state = 'enable';
      this.ballon = this.dom.find('.unread');
      this.ballon.addClass('hidden-ballon');
      this.dom.addClass('enable');
      this.dom.click(function(){
        if (this$.state === 'enable') {
          this$.constructor.disableOtherButtons(this$);
          this$.clicked();
          this$.getNumber();
        }
      });
      this.constructor.buttons.push(this);
    }
    prototype.getNumber = function(){
      var this$ = this;
      $.get('/hehe', function(number, status){
        if (this$.state === 'clicked') {
          this$.constructor.enableOtherButtons(this$);
          this$.done();
          this$.showNumberInBallon(number);
          BigButton.count(number);
          if (this$.constructor.allButtonsClicked() === true) {
            BigButton.changeBigButtonState();
          }
        }
      });
    };
    prototype.enable = function(){
      this.state = "enable";
      this.dom.removeClass("disable");
      this.dom.addClass("enable");
    };
    prototype.disable = function(){
      this.state = "disable";
      this.dom.removeClass("enable");
      this.dom.addClass("disable");
    };
    prototype.clicked = function(){
      this.state = "clicked";
      this.ballon.removeClass('hidden-ballon');
      this.ballon.addClass('waiting-ballon');
      this.ballon.text('...');
    };
    prototype.done = function(){
      this.state = "done";
      this.dom.removeClass("enable");
      this.dom.addClass("disable");
    };
    prototype.reset = function(){
      this.state = "enable";
      this.dom.removeClass('disable');
      this.dom.addClass('enable');
      this.ballon.removeClass(this.state);
      this.ballon.addClass('hidden-ballon');
      this.ballon.text('');
    };
    prototype.showNumberInBallon = function(number){
      this.ballon.text(number);
    };
    return Button;
  }());
  addClickingToAllButtons = function(){
    var i$, ref$, len$;
    for (i$ = 0, len$ = (ref$ = $('.button')).length; i$ < len$; ++i$) {
      (fn$.call(this, ref$[i$]));
    }
    function fn$(dom){
      var button;
      button = new Button($(dom));
    }
  };
  addClickingToBigButtons = function(){
    var dom, bigButton;
    dom = $('#info-bar');
    bigButton = new BigButton($(dom));
  };
  addClickingToAtButton = function(){
    var dom, atButton;
    dom = $('#icon');
    atButton = new AtButton($(dom));
  };
  $(function(){
    addClickingToAllButtons();
    addClickingToBigButtons();
    addClickingToAtButton();
    resetAllWhenLeaving();
    resetAllWhenEntering();
  });
  resetAllWhenLeaving = function(){
    var all;
    all = $('#bottom-positioner');
    all.mouseleave(function(){
      BigButton.resetLargeButton();
      Button.resetAll();
      AtButton.atButtonReset();
    });
  };
  resetAllWhenEntering = function(){
    var all;
    all = $('#buttom-positoner');
    all.mouseenter(function(){
      BigButton.resetLargeButton();
      Button.resetAll();
      AtButton.atButtonReset();
    });
  };
  BigButton = (function(){
    BigButton.displayName = 'BigButton';
    var prototype = BigButton.prototype, constructor = BigButton;
    BigButton.number = 0;
    BigButton.resetLargeButton = function(){
      this.bigButton.reset();
    };
    BigButton.bigButton;
    BigButton.count = function(newNumber){
      this.number += parseInt(newNumber);
    };
    BigButton.changeBigButtonState = function(){
      this.bigButton.enable();
    };
    prototype.showNumberInBigButton = function(){
      this.showNumberContainer.text(this.constructor.number);
    };
    function BigButton(dom){
      var this$ = this;
      this.dom = dom;
      this.disable();
      this.showNumberContainer = this.dom.find('p');
      this.dom.click(function(){
        if (this$.state === 'enable') {
          this$.showNumberInBigButton();
          this$.disable();
        }
      });
      this.constructor.bigButton = this;
    }
    prototype.disable = function(){
      this.state = 'disable';
      this.dom.removeClass('enable');
      this.dom.addClass('disable');
    };
    prototype.enable = function(){
      this.state = 'enable';
      this.dom.removeClass('disable');
      this.dom.addClass('enable');
    };
    prototype.reset = function(){
      this.state = 'disable';
      this.dom.removeClass('enable');
      this.dom.addClass('disable');
      this.constructor.number = 0;
      this.showNumberContainer.text("");
    };
    return BigButton;
  }());
  AtButton = (function(){
    AtButton.displayName = 'AtButton';
    var prototype = AtButton.prototype, constructor = AtButton;
    AtButton.button;
    AtButton.atButtonReset = function(){
      this.button.reset();
    };
    function AtButton(dom){
      var button, this$ = this;
      this.dom = dom;
      button = this.dom;
      this.state = 'enable';
      this.dom.click(function(){
        if (this$.state === 'enable') {
          Button.clickOneByOne();
          this$.state = 'disable';
        }
      });
      this.constructor.button = this;
    }
    prototype.enable = function(){
      return this.state = 'enable';
    };
    prototype.disable = function(){
      return this.state = 'disable';
    };
    prototype.reset = function(){
      return this.state = 'enable';
    };
    return AtButton;
  }());
}).call(this);