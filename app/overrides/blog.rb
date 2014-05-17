# Spree now uses kaminari for paginating, so any extension which uses will_paginate can breake application. 
# Following code updates blog model\controller (and views, in views folder) for compability with kaminary
BlogEntriesController.class_eval do
  def tag
    @blog_entries = BlogEntry.by_tag(params[:tag]) 
    render 'index'
  end
  def index
    @blog_entries = BlogEntry.published.page params[:page]
  end 
end

#BlogEntry.class_eval do
#  paginates_per Spree::Config[:blog_entries_per_page].to_i # to_i is important, cause kaminari needs integer value of per page number
#end

# Spree Blogging Spree uses old hooks and uses it wrong, so some override to good placement of blog tab

Deface::Override.new(
    :virtual_path => "layouts/admin",
    :insert_bottom => "[data-hook='admin_tabs']",
    :text => %(<%= tab(:blog, { :route => "admin_blog_entries" })  %><%= stylesheet_link_tag 'admin/fixes' %>)
)

Deface::Override.new(:virtual_path => %q{shared/_head},
                          :insert_bottom => "head",
                          :name => %q{add_to_head},
                          :text => %q{<%= javascript_include_tag 'news_archive_widget' %>
                                      <%= stylesheet_link_tag 'blog' %>},
                          :disabled => false,
                          :sequence => 100
)
