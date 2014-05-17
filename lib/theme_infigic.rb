module themeInfigic  class Engine < Rails::Engine
    railtie_name "theme_nimishadani"

    config.autoload_paths += %W(#{config.root}/lib)

    def self.activate
      Dir.glob(File.join(File.dirname(__FILE__), "../app/overrides/*.rb")) do |c|
        Rails.application.config.cache_classes ? require(c) : load(c)
      end


      HomeController.class_eval do
        layout 'welcome'
      end

      ProductsController.class_eval do
        layout :select_layout
        def select_layout
          return "detailed" if params[:action].match(/show/).present?
          "spree_application"
        end
      end
    end

    config.to_prepare &method(:activate).to_proc
  end
end
