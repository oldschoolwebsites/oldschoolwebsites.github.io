txt= 'display:inline;color:#fff;font-family:Cambria,Garamond,Georgia,Times,serif;font-size:12px;'
txt.gsub!("\n", '')
txt.gsub!("./", '')
array_of_variables=txt.split(';').sort
array_of_variables.each {|entry| puts entry+';'}
