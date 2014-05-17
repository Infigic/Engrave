= Theme Infigic


**This how gemfile should look like:**

gem 'rails', '3.1.0.rc5'

gem 'pg',                             '~> 0.11' # require add to env PATH=$PATH:/usr/pgsql-9.0/bin

gem 'json'
gem 'execjs' 
gem 'therubyracer'

gem 'spree', :git => 'git://github.com/spree/spree.git'
gem "spree_pages", :git => 'git://github.com/sebastyuiop/spree_pages.git'

gem 'json'
gem 'rmagick'
gem 'carrierwave'
gem 'spree_flexi_variants', :git=>'git@github.com:jsqu99/spree_flexi_variants.git'
gem 'kaminari'

gem 'spree_blogging_spree', :git => 'git://github.com/dissection/spree-blogging-spree.git'

gem 'spree_related_products', :git => 'git://github.com/spree/spree_related_products.git'
gem "spree_comments", :git => 'git://github.com/spree/spree_comments.git'
gem "acts_as_commentable"
gem "spree_store_credits", :git => 'git://github.com/spree/spree_store_credits.git'
gem "spree_social"

gem 'theme_nimishadani', :path => 'vendor/gems/theme_nimishadani'


group :assets do
  gem 'sass-rails', "~> 3.1.0.rc"
  gem 'coffee-rails', "~> 3.1.0.rc"
  gem 'uglifier'
end

gem 'jquery-rails'
