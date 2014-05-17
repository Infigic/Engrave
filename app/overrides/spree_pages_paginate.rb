Page.class_eval do 
  paginates_per 50
end

PagesController.class_eval do
  layout "pages"
end

Admin::PagesController.class_eval do 
  def index
    @pages = Page.page params[:page]
  end
end
