var fetchDeals, sortByName, sortByPrice, sortByStars, sortOnClick,
    deals = [], 
    dealsSortingControls = "<ul id='deals-sorting-controls'><li><a href='javascript:'>sort <b>alphabetically</b></a></li><li><a class='active' href='javascript:'>sort by <b>price</b></a></li><li><a href='javascript:'>sort by <b>star rating</b></a></li></ul>",
    htmlDeals = '';

function sortByName(a, b) {
    var aName = a.name.toLowerCase();
    var bName = b.name.toLowerCase();
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function sortByPrice(a, b) {
    var aPrice = a.price;
    var bPrice = b.price;
    return aPrice - bPrice;
}

function sortByStars(a, b) {
    var aStars = a.stars;
    var bStars = b.stars;
    return aStars - bStars;
}
function fetchDeals() {
    deals = [];
    $("ul#deals > li").each(function() {
        deals.push({
            "name": $(this).find('h1').clone().children().remove().end().text(),
            "stars": $(this).find('h1 .stars').text()[0],
            "price": +$(this).find('.price span').text().replace(',', '').substr(1),
            'html_code': $(this).html()
        });
    })
    return deals;
}
function sortOnClick(event, _this, sort) {
    event.preventDefault();
    var class_on_active = _this.className;
    htmlDeals = '';
    $(_this).parent().parent().find('a').removeClass();
    _this.className = class_on_active;
    fetchDeals();
    if ($(_this).hasClass('active asc')) {
        $(_this).removeClass().addClass('active desc');
        $(deals.sort(sort).reverse()).each(function() {
            htmlDeals += '<li>' + this.html_code + '</li>';
        });
    } else {
        $(_this).removeClass().addClass('active asc');
        $(deals.sort(sort)).each(function() {
            htmlDeals += '<li>' + this.html_code + '</li>';
        });
    }
    $('#deals').empty();
    $('#deals').prepend(htmlDeals);
}

// Run once on Initialisation
$(dealsSortingControls).insertBefore('#deals');
$($('#deals-sorting-controls a')[0]).on('click', function(event) {
    sortOnClick(event, this, sortByName);
});
$($('#deals-sorting-controls a')[1]).on('click', function(event) {
    sortOnClick(event, this, sortByPrice);
});
$($('#deals-sorting-controls a')[2]).on('click', function(event) {
    sortOnClick(event, this, sortByStars);
});

$('#deals .more-info').each(function() {
    $(this).addClass('closed');
});
$('#deals').on('click','.more-info', function(event) {
    event.preventDefault();
    $(this).toggleClass('closed');
});
