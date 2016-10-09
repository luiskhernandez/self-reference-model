// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

// var addField = function(condition) {
//   return function(e) {
//     var selector = 'data-form-prepend-'+condition;
//     var obj = $( $(this).attr(selector));
//     obj.find('input, select, textarea').each( function() {
//       $(this).attr( 'name', function() {
//         return $(this).attr('name').replace( 'new_record', (new Date()).getTime() );
//       });
//     });
//     $('.'+condition+'-children-wrapper').append(obj)
//     return false;
//   }
// }

var removeField = function(e) {
  e.preventDefault();
  $(this).parent('div').remove();
}

var toogleElse = function (e) {
  e.preventDefault();
  $(this).parent('.else-wrapper').slideToggle('slow');
}

var addField = function(e) {
  var level = $(e.toElement).data('level');
  var parent_id = $(e.toElement).data('parent-id');
  var parent = $(e.toElement).data('parent');
  var compiled = _.template($('#itemTemplate').html());
  $(this).parent().append(compiled({
    level: level,
    parent: parent,
    parent_id: parent_id || 0,
    id: (new Date()).getTime()
  }));
}

$(function(){
  _.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
  };

  $('.children-wrapper').on('click','.js-remove-field', removeField);
  $('.children-wrapper').on('click','.js-add-field', addField);
  $('body').on('click','.js-else-wrapper', toogleElse );
})

