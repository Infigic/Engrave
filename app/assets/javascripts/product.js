var add_image_handlers = function() {
  $("#main-image").data('selectedThumb', $('#main-image img').attr('src'));
  $('ul.thumbnails li').eq(0).addClass('selected');
  $('ul.thumbnails li a').click(function() {
    $("#main-image").data('selectedThumb', $(this).attr('href'));
    $('ul.thumbnails li').removeClass('selected');
    $(this).parent('li').addClass('selected');
    return false;
  }).hover(
          function() {
            $('#main-image img').attr('src', $(this).attr('href').replace('mini', 'product'));
          },
          function() {
            $('#main-image img').attr('src', $("#main-image").data('selectedThumb'));
          }
          );
};
 
jQuery(document).ready(function() {
  add_image_handlers();
});
 
jQuery(document).ready(function() {
  jQuery('#product-variants input[type=radio]').click(function (event) {
    var vid = this.value;
    var text = $(this).siblings(".variant-description").html();
 
    jQuery("#variant-thumbnails").empty();
    jQuery("#variant-images span").html(text);
 
    if (images[vid].length > 0) {
      $.each(images[vid], function(i, link) {
        jQuery("#variant-thumbnails").append('<li>' + link + '</li>');
      });
 
      jQuery("#variant-images").show();
    } else {
      jQuery("#variant-images").hide();
    }
 
    add_image_handlers();
 
    var link = jQuery("#variant-thumbnails a")[0];
 
    jQuery("#main-image img").attr({src: jQuery(link).attr('href')});
    jQuery('ul.thumbnails li').removeClass('selected');
    jQuery(link).parent('li').addClass('selected');
  });
});


jQuery.ajaxSetup({
  'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
})

jQuery.fn.extend( {
  submitWithAjax: function() {
    this.submit(function(e) {
      e.preventDefault();
      $.post(this.action, $(this).serialize(), null, "script");
      return false;
      })
      return this;
    },

    onChangeWithAjax: function() {
      this.change(function(e) {
        e.preventDefault();
        $.post('/products/option_value_changed', $("#cart_form").serialize(), null, "script");
        return false;
      })
      return this;
    }
});


var app =
{
  setupAjaxCallbacks: function () {
    $('body').ajaxStart(function (){
      //$("#busy_indicator").show();
    });
    $('body').ajaxStop(function () {
      //$("#busy_indicator").hide();
    });
  },

  addToCart: function() {
   // $("#cart_form").submitWithAjax();
  },

  optionValueChanged: function() {
    $("select#option_values_select_primary").onChangeWithAjax();
    $("input#option_values_radio_primary").onChangeWithAjax();
  }
}

jQuery( function () {
  app.setupAjaxCallbacks();

  app.addToCart();

  app.optionValueChanged();
});

