$(function() {
    function file_check(){
      var ptype=/\.(JPG|JPEG|BMP|GIF|PNG|PSD|PDF|DOC|TIF)$/i;
      if (ptype.test($('#artwork_photo').val())){
        $('#sub_me').attr('disabled',false);
        $('#info').text("Click to continue.")
      }else{
        $('#sub_me').attr('disabled',true);
        $('#artwork_photo').val('');
        $('#info').text('You must upload a photo to proceed or select another option to continue.');
      }
    }
    $('input[type=radio]').change(function() {
      if ($(this).hasClass('uploader_option')) {
        $('#artwork_photo').attr('disabled',false);
        file_check();
      }
      else if ($(this).hasClass('photo_option')) {
         $('#artwork_photo').attr('disabled',true).val('');
         $('#sub_me').attr('disabled',false);
         $('#info').text("Click to continue.");
      }
    });

 $('#checkout_form_address').validate();
    
 state_mapper = {"92":[[1061493614,"Andaman & Nicobar"],[1061493586,"Andhra Pradesh"],[1061493587,"Arunachal Pradesh"],[1061493588,"Assam"],[1061493589,"Bihar"],[1061493615,"Chandigarh"],[1061493590,"Chattisgarh"],[1061493616,"Dadra and Nagar Haveli"],[1061493617,"Daman & Diu"],[1061493618,"Delhi"],[1061493591,"Goa"],[1061493592,"Gujarat"],[1061493593,"Haryana"],[1061493594,"Himachal Pradesh"],[1061493595,"Jammu & Kashmir"],[1061493596,"Jharkhand"],[1061493597,"Karnataka"],[1061493598,"Kerala"],[1061493619,"Lakshadweep"],[1061493599,"Madhya Pradesh"],[1061493600,"Maharashtra"],[1061493601,"Manipur"],[1061493602,"Meghalaya"],[1061493603,"Mizoram"],[1061493604,"Nagaland"],[1061493605,"Orissa"],[1061493620,"Puducherry"],[1061493606,"Punjab"],[1061493607,"Rajasthan"],[1061493608,"Sikkim"],[1061493609,"Tamil Nadu"],[1061493610,"Tripura"],[1061493612,"Uttar Pradesh"],[1061493611,"Uttarakhand"],[1061493613,"West Bengal"]],"214":[[1061493585,"Alabama"],[403740659,"Alaska"],[948208802,"Arizona"],[471470972,"Arkansas"],[276110813,"California"],[536031023,"Colorado"],[69870734,"Connecticut"],[721598219,"Delaware"],[6764998,"District of Columbia"],[267271847,"Florida"],[876916760,"Georgia"],[199950338,"Hawaii"],[982433740,"Idaho"],[625629523,"Illinois"],[769938586,"Indiana"],[825306985,"Iowa"],[969722173,"Kansas"],[308473843,"Kentucky"],[37199952,"Louisiana"],[1055056709,"Maine"],[480368357,"Maryland"],[385551075,"Massachusetts"],[931624400,"Michigan"],[1032288924,"Minnesota"],[532363768,"Mississippi"],[653576146,"Missouri"],[999156632,"Montana"],[673350891,"Nebraska"],[179539703,"Nevada"],[426832442,"New Hampshire"],[750950030,"New Jersey"],[69729944,"New Mexico"],[889445952,"New York"],[177087202,"North Carolina"],[51943165,"North Dakota"],[485193526,"Ohio"],[248548169,"Oklahoma"],[298914262,"Oregon"],[471711976,"Pennsylvania"],[474001862,"Rhode Island"],[597434151,"South Carolina"],[615306087,"South Dakota"],[726305632,"Tennessee"],[525212995,"Texas"],[17199670,"Utah"],[989115415,"Vermont"],[41111624,"Virginia"],[414569975,"Washington"],[91367981,"West Virginia"],[103680699,"Wisconsin"],[66390489,"Wyoming"]]};

    var get_states = function(region){
      var country        = $('p#' + region + 'country' + ' span#' + region + 'country :only-child').val();
      return state_mapper[country];
    }

    var show_billing = function(show) {
        if(show) {
          $('#shipping .inner').show();
          $('#shipping .inner input').removeAttr('disabled', 'disabled');
          $('#shipping .inner select').removeAttr('disabled', 'disabled');
        } else {
          $('#shipping .inner').hide();
          $('#shipping .inner input').attr('disabled', 'disabled');
          $('#shipping .inner select').attr('disabled', 'disabled');
        }
      }

    var update_state = function(region) {
      var states         = get_states(region);

      var state_select = $('p#' + region + 'state select');
      var state_input = $('p#' + region + 'state input');
      if(states) {
        var selected = state_select.val();
        state_select.html('');
        var states_with_blank = [["",""]].concat(states);
        $.each(states_with_blank, function(pos,id_nm) {
          var opt = $(document.createElement('option'))
                    .attr('value', id_nm[0])
                    .html(id_nm[1]);
          if(selected==id_nm[0]){
            opt.attr('selected', 'selected');
          }
          state_select.append(opt);
        });
        state_select.removeAttr('disabled').show();
        state_input.hide().attr('disabled', 'disabled');

      } else {
        state_input.removeAttr('disabled').show();
        state_select.hide().attr('disabled', 'disabled');
      }

    };

    // Show fields for the selected payment method
    $("input[type='radio'][name='order[payments_attributes][][payment_method_id]']").click(function(){
      $('#payment-methods li').hide();
      if(this.checked){ $('#payment_method_'+this.value).show(); }
    }).triggerHandler('click');

    jQuery(document).ready(function(){
      $('span#bcountry select').change(function() { update_state('b'); });
      $('span#scountry select').change(function() { update_state('s'); });
      show_billing(!$('input#checkout_use_billing').attr('checked'));
      update_state('b');
      update_state('s');
    });

    $('input#order_use_billing').click(function() {
      if($(this).is(':checked')) {
        $('#shipping .inner input, #shipping .inner select, #shipping .inner label, #shipping .inner .req').hide();
        $('#shipping .inner input, #shipping .inner select').attr('disabled', 'disabled');
      } else {
        $('#shipping .inner input, #shipping .inner select, #shipping .inner label, #shipping .inner .req').show();
        $('#shipping .inner input, #shipping .inner select').removeAttr('disabled', 'disabled');

        //only want to enable relevant field
        if(get_states('s')){
          $('span#sstate input').hide().attr('disabled', 'disabled');
        }else{
          $('span#sstate select').hide().attr('disabled', 'disabled');
        }

      }
    }).triggerHandler('click');

    $('form.edit_checkout').submit(function() {
      $(this).find(':submit, :image').attr('disabled', true).removeClass('primary').addClass('disabled');
    });

    // Remove an item from the cart by setting its quantity to zero and posting the update form
    $('form#updatecart a.delete').show().live('click', function(e){
      $(this).parents('tr').find('input.line_item_quantity').val(0);
      $(this).parents('form').submit();
      e.preventDefault();
    });
});





