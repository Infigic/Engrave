# Uncomment this if you reference any of your controllers in activate
# require_dependency 'application'

class ThemeInfigic< Spree::Extension
  version "1.0"
  description "Describe your extension here"
  url "http://yourwebsite.com/nimishadani"

  # Please use nimishadani/config/routes.rb instead for extension routes.

  # def self.require_gems(config)
  #   config.gem "gemname-goes-here", :version => '1.2.3'
  # end
  
  def activate
    # make your helper avaliable in all views
    # Spree::BaseController.class_eval do
    #   helper YourHelper
    # end
    
    PagesController.class_eval do
      layout  "pages"
    end

    PostsController.class_eval do
      layout  "pages"
    end

    ProductsController.class_eval do
      layout :select_layout

      def select_layout
        return "welcome" if request.request_uri == '/'
        return "detailed" if params[:action].match(/show/).present?
        "spree_application"
      end

    end

  end  
end
