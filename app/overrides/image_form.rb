Deface::Override.new(:name => 'set_cart_form_enctype',
                   :virtual_path => 'products/_cart_form',
                   :replace => "code[erb-loud]:contains('populate_orders_url')",
                   :text => "<%= form_for :order, :url => populate_orders_url, :html => {:multipart => true} do |f| %>")
