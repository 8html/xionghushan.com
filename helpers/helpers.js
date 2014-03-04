module.exports.register = function(Handlebars, options) {
  Handlebars.registerHelper('obj_val', function(object, property) {
    return object ? object[property] : property;
  });

  Handlebars.registerHelper('str', function(object) {
    return JSON.stringify(object);
  });

  // override inspect
  Handlebars.registerHelper('inspect', function(object) {
    return '<textarea style="width: 100%; height: 400px; ' +
      'font: 12px monospace;">' + JSON.stringify(object, null, 2) +
      '</textarea>';
  });

  Handlebars.registerHelper('get', function(object/* ... */) {
    for (var i = 1; i < arguments.length - 1; i++) {
      if (object.hasOwnProperty(arguments[i])) {
        object = object[arguments[i]];
      } else {
        return 'null';
      }
    }
    if (typeof(object) === 'string') {
      return object;
    } else {
      return JSON.stringify(object);
    }
  });

  Handlebars.registerHelper('eachReverse', function(context) {
    var options = arguments[arguments.length - 1];
    var ret = '';

    if (context && context.length > 0) {
        for (var i = context.length - 1; i >= 0; i--) {
            ret += options.fn(context[i]);
        }
    } else {
        ret = options.inverse(this);
    }

    return ret;
  });

  Handlebars.registerHelper('startsWith', function(str, substr, content) {
    if (str && substr && str.indexOf(substr) === 0) {
      return content.fn(this);
    } else {
      return content.inverse(this);
    }
  });

  Handlebars.registerHelper('makeBreadFor', function(nav) {
    var ret = [''];
    for (var section in nav) {
      var first = null;
      for (var item in nav[section]) {
        if (first === null) {
          first = nav[section][item];
          ret.push('<a href="' + first + '">' + section + '</a>');
        }
        if (this.permalink === nav[section][item]) {
          ret.push('<a href="' + nav[section][item] + '">' + item + '</a>');
          break;
        }
      }
      break;
    }
    return ret.join('\n&raquo;\n');
  });

  Handlebars.registerHelper('makeSitemapFor', function(context) {
    var options = arguments[arguments.length - 1];
    var ret = '';
    var pages = [];
    var date = new Date();
    for (var i = 0; i < context.length; i++) {
      var priority = 1;
      var changefreq = "daily";
      if (context[i].match(/\//g).length > 1) {
        priority -= 0.2;
      }
      if (!/\/$/.test(context[i])) {
        priority -= 0.2
        changefreq = "weekly";
      }
      pages.push({
        loc: context[i],
        lastmod: date,
        changefreq: changefreq,
        priority: priority.toFixed(1)
      });
    }
    pages.sort(function(a, b) {
      if (a.priority > b.priority) {
        return -1;
      } else if (a.priority == b.priority) {
        return a.loc > b.loc ? 1 : -1;
      } else {
        return 1;
      }
    });
    for (var i = 0; i < pages.length; i++) {
      ret += options.fn(pages[i]);
    }
    return ret;
  });
};
