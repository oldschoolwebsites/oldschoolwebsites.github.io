$(function(){
$('#price_in_other_currency li p').css('display', 'none');
$('#price_in_other_currency li p').css('background-color', '#fff');
$('#price_in_other_currency li p').css('border', '1px solid #999');

$('li#us_dollar a').mouseover(function(){
		$('li#us_dollar p').css('position', 'absolute');	
		$('li#us_dollar p').css('width', '60px');	
		$('li#us_dollar p').css('margin-top', '-45px');	
		$('li#us_dollar p').css('margin-left', '-71px');	
		$('li#us_dollar p').toggle();
		});
$('li#us_dollar a').mouseleave(function(){
		$('li#us_dollar p').toggle();
		});
$('li#pound a').mouseover(function(){
		$('li#pound p').css('position', 'absolute');	
		$('li#pound p').css('width', '70px');	
		$('li#pound p').css('margin-top', '-46px');	
		$('li#pound p').css('margin-left', '-80px');	
		$('li#pound p').toggle();
		});
$('li#pound a').mouseleave(function(){
		$('li#pound p').toggle();
		});

$('li#euro a').mouseover(function(){
		$('li#euro p').css('position', 'absolute');	
		$('li#euro p').css('width', '60px');	
		$('li#euro p').css('margin-top', '-49px');	
		$('li#euro p').css('margin-left', '-69px');	
		$('li#euro p').css('display', 'block');	
		});
$('li#euro a').mouseleave(function(){
		$('li#euro p').css('display', 'none');
		});
$('li#yen a').mouseover(function(){
		$('li#yen p').css('position', 'absolute');	
		$('li#yen p').css('width', '60px');	
		$('li#yen p').css('margin-top', '-32px');	
		$('li#yen p').css('margin-left', '-65px');	
		$('li#yen p').toggle();
		});
$('li#yen a').mouseleave(function(){
		$('li#yen p').toggle();
		});
});
