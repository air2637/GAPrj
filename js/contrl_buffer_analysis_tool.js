// contrl_buffer_analysis_tool.js
var buffer_layers = {};

function generateBufferForm(buffer_selection, buffer_name) {
    var form = $('<form></form>').attr('id', buffer_selection).addClass('buffer_form');
    var label_1 = $('<label></label>').text(buffer_name + " radius: ").appendTo(form);
    var input_textbox = $('<input/>').attr({ type: 'text', id: buffer_selection + "_radius", value: "35" }).appendTo(form);

    input_textbox.on('input propertychange paste', function() {

        radius = input_textbox.val();
        if ($.isNumeric(radius) && radius > 0) {
            if (buffer_selection == 'cc_buffer_layer') {
                map.removeLayer(cc_buffer_layer);
                cc_buffer_layer = add_buffer_to_cc(radius, unit);
            } else if (buffer_selection == 'lib_buffer_layer') {
                map.removeLayer(lib_buffer_layer);
                lib_buffer_layer = add_buffer_to_lib(radius, unit);
            } else if (buffer_selection == 'nature_buffer_layer') {
                map.removeLayer(nature_buffer_layer);
                nature_buffer_layer = add_buffer_to_nature(radius, unit);
            }

        }
    });

    input_textbox.val(35);


    var label_2 = $('<label></label>').text(buffer_name + " radius unit: ").appendTo(form);

    var dropdown = $('<select></select>').attr({ id: buffer_selection + "_unit" });
    var data = {
        'meters': 'meters',
        'kilometers': 'kilometers',
        'miles': 'miles'
    };
    for (var val in data) {
        $('<option />').attr({ value: val }).text(data[val]).appendTo(dropdown);
    }
    dropdown.appendTo(form);

    var data_2 = {
        'atm_in_cc_buffer': 'ATM',
        'cafe_in_cc_buffer': 'Cafe',
        'foodBeverage_in_cc_buffer': 'Food Beverage',
        'parking_in_cc_buffer': 'Parking',
        'taxi_in_cc_buffer': 'Taxi'
    }
    var user_added_faci = window.user_added_layers_faci;
    var faci_div = $("<div />").attr('id', 'faci_div');
    for (var val in data_2) {
        var option = $('<label></label>').html(data_2[val]).prepend($('<input />').attr({ type: 'checkbox', id: val + buffer_selection }));
        option.appendTo(faci_div);
    }
    for (var val in user_added_faci) {
        var option = $('<label></label>').html(val).prepend($('<input />').attr({ type: 'checkbox', id: val + buffer_selection }));
        option.appendTo(faci_div);
    }
    $('<button />').attr({ type: 'button', id: buffer_selection + '_button' }).text("Points in Buffer").appendTo(faci_div);
    faci_div.appendTo(form);

    $('#buffer_layer_div').append(form);

}

function regenerateForm() {
    if ($('#buffer_layer_div').find($('.buffer_form')).length > 0) {
        $('.buffer_form').remove();
    }
    var _buffer_selection = $('#buffer_layer_selection').val();
    console.log(_buffer_selection);
    var _buffer_name = $('#buffer_layer_selection option:selected').text();
    console.log(_buffer_name);
    generateBufferForm(_buffer_selection, _buffer_name);
}

$("#buffer_layer_selection").change(function() {
    regenerateForm();
})
