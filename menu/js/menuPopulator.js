function populateMenuDataFromFile(menuType) {
    var htmlTemplate = getHtmlTemplate();
    jQuery.get('../menu/' + menuType + 'Column1' + '.txt', function(data) {
        var column1GeneratedHtml = generateHtmlFromFileData(data, htmlTemplate)
        $('#' + menuType + 'Column1').html(column1GeneratedHtml);
    });

    jQuery.get('../menu/' + menuType + 'Column2' + '.txt', function(data) {
        var column2GeneratedHtml = generateHtmlFromFileData(data, htmlTemplate)
        $('#' + menuType + 'Column2').html(column2GeneratedHtml);
    });
}

function getHtmlTemplate() {
    htmlTemplate = '';
    $.ajax({
        url: '../menu/js/genericMenuTemplate.txt',
        type: "get",
        async: false,
        success: function(data) {
            htmlTemplate = data.replace('\n', '');
        },
        error: function() {
            console.log('Could not load menu data');
        }
    });
    return htmlTemplate;
}

function generateHtmlFromFileData(fileData, htmlTemplate) {
    var fileLines = fileData.split('\n');

    var generatedHtml = '';
    for (index in fileLines) {
        if(fileLines[index].trim() === "") {
            continue;
        }
		
        var lineData = fileLines[index].split(':');
        generatedHtml = generatedHtml.concat(htmlTemplate.replace('{name}', lineData[0])
            .replace('{price}', lineData[1])
            .replace('{description}', lineData[2])
        );
    }

    return generatedHtml;
}

$(document).ready(function() {
    populateMenuDataFromFile('breakfast');
    populateMenuDataFromFile('lunch');
    populateMenuDataFromFile('entrees');
    populateMenuDataFromFile('bbq');
    populateMenuDataFromFile('beverages');
    populateMenuDataFromFile('desserts');
});