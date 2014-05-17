Gem::Specification.new do |s|
  s.platform    = Gem::Platform::RUBY
  s.name        = 'theme_infigic'
  s.version     = '0.6.0'
  s.summary     = 'A Spree Commerce Theme'


  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.require_path = 'lib'
  s.requirements << 'none'

  # See readme for needed gemfile
  s.add_dependency('spree_pages')
  s.add_dependency('spree_related_products')
  s.add_dependency('spree_comments')
  s.add_dependency('spree_store_credits')
  s.add_dependency('spree_social')
  s.add_dependency('spree_flexi_variants')
  s.add_dependency('spree_blogging_spree') #NOTE it's important to use this fork git://github.com/dissection/spree-blogging-spree.git

  s.has_rdoc = false
end
