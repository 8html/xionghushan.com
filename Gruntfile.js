module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          host: '*',
          port: 3000,
          base: 'site'
        }
      }
    },
    copy: {
      css_images: {
        files: {
          'site/assets/': [ 'css/images/*' ]
        }
      },
      images: {
        files: {
          'site/': [ 'images/**' ]
        }
      },
      statics: {
        expand: true,
        cwd: 'static/',
        src: '**',
        dest: 'site/',
        dot: true
      }
    },
    clean: {
      css: [ 'site/assets/css/*.css' ],
      js: [ 'site/assets/js/*.js' ],
      images: [ 'site/assets/images/**' ],
      site: [ 'site' ],
      tmp: [ 'js/tmp' ]
    },
    less: {
      options: {
        cleancss: true,
        stripBanners: true,
        banner: '/*! Generated on <%= grunt.template.today("dddd, mmmm dS, ' +
          'yyyy, h:MM:ss TT") %> */\n'
      },
      styles: {
        files: {
          'site/assets/css/application.css': [ 'css/index.less' ]
        }
      }
    },
    uglify: {
      javascripts: {
        files: [{
          expand: true,
          cwd: 'js/',
          src: [ '**/*.js', '!**/*.min.js' ],
          dest: 'js/tmp/'
        }]
      }
    },
    concat: {
      options: {
        banner: '/*! Generated on <%= grunt.template.today("dddd, mmmm dS, ' +
          'yyyy, h:MM:ss TT") %> */\n'
      },
      js: {
        files: {
          'site/assets/js/application.js': [
            'js/tmp/vendor/fastclick.js',
            'js/vendor/jquery-*.min.js',
            'js/vendor/*.min.js',
            'js/tmp/**/*.js'
          ]
        }
      }
    },
    assemble: {
      options: {
        pkg: '<%= pkg %>',
        plugins: [ 'assemble-permalink', 'helpers/trim.js', 'helpers/all_pages.js' ],
        helpers: [ 'handlebars-helper-prettify', 'helpers/helpers.js' ],
        layoutdir: 'layouts',
        layout: 'default.hbs',
        production: false,
        posts: {
          products: grunt.file.readYAML('posts/products.yml')
        },
        prettify: {
          unformatted: [ 'br', 'img', 'a', 'sub', 'sup', 'b', 'i', 'u', 'textarea', 'pre' ]
        }
      },
      news: {
        options: {
          layout: 'news.hbs',
          permalink: '/news/{{ basename }}.html'
        },
        files: {
          'site/': [ 'pages/~news*.hbs', 'posts/news/**/*.html' ]
        }
      },
      site: {
        files: {
          'site/': [ 'pages/*.hbs', '!pages/~*.hbs' ]
        }
      },
      products: {
        options: {
          layout: 'product.hbs',
          pages: '<%= assemble.options.posts.products %>'
        },
        files: { 'site/': [] }
      },
      sitemap: {
        files: {
          'site/': [ 'pages/~sitemap.hbs' ]
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: [ 'css/**/*.less', 'css/**/*.css' ],
        tasks: [ 'clean:css', 'less' ]
      },
      css_images: {
        files: [ 'css/images/*' ],
        tasks: [ 'copy:css_images' ]
      },
      js: {
        files: [ 'js/*', 'js/vendor/*' ],
        tasks: [ 'clean:js', 'uglify', 'concat', 'clean:tmp' ]
      },
      grunt: {
        files: [ 'Gruntfile.js' ]
      },
      pages: {
        files: [ 'pages/*.hbs', 'layouts/*.hbs', 'helpers/*' ],
        tasks: [ 'assemble:site' ]
      },
      news: {
        files: [ 'posts/news/**' ],
        tasks: [ 'assemble:news' ]
      },
      products: {
        files: [ 'posts/products.yml' ],
        tasks: [ 'assemble' ]
      },
      images: {
        files: [ 'images/**' ],
        tasks: [ 'copy:images' ]
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('common', [
    'clean',
    'less',
    'uglify',
    'concat',
    'clean:tmp',
    'copy'
  ]);

  grunt.registerTask('default', [
    'common',
    'assemble',
    'connect',
    'watch'
  ]);

  grunt.registerTask('make', [
    'common',
    'assemble_in_production',
    'assemble'
  ]);

  grunt.registerTask('assemble_in_production', 'Enter production mode.',
    function() {
    grunt.config('assemble.options.production', true);
    grunt.log.ok('Entered production mode.');
  });

};
