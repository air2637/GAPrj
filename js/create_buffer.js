$('input.radio-liked-chk').on('change', function() {
    $('input.radio-liked-chk').not(this).prop('checked', false);

    if (window.user_buffer_table != null || window.user_buffer_table != undefined) {
        window.user_buffer_table.remove();
    }
    if (window.user_buffer_layer != null || window.user_buffer_layer != undefined) {
        map.removeLayer(window.user_buffer_layer);
    }



    if ($("#nature_buffer_layer").prop('checked') == true) {
        /* radius = 35;
         unit = 'meters';
         $('#nature_buffer_radius').val(35);
         $('#nature_buffer_unit').val('meters');
         $("#nature_buffer_form").slideDown();
         nature_buffer_layer = add_buffer_to_nature(radius, unit);*/

        var name = "Natural Parks";

        radius = 35;
        unit = 'meters';
        $('#tmp_buffer_radius').val(35);
        $('#tmp_buffer_unit').val('meters');

        window.user_buffer_layer = add_user_data_buffer(radius, unit, "#nature_buffer_layer");

        // create dynamic form
        window.user_buffer_table = $('#template_buffer_form').clone();
        window.user_buffer_table.attr('id', 'current_form');

        //modify the template buffer form, but in this case, no need, as I user assume to use one buffer form at a time only
        /*window.user_buffer_table.attr('id', window.current_layer_name+'_buffer_form');
        window.user_buffer_table.find('#tmp_buffer_radius').attr()*/
        window.user_buffer_table.find("#label_radius").text(name + " buffer radius:");
        window.user_buffer_table.find("#label_unit").text(name + " buffer unit:");


        //attach event listener to form elements
        // update buffer radius
        window.user_buffer_table.find('#tmp_buffer_radius').on('input propertychange paste', function() {
            radius = $(this).val();
            if ($.isNumeric(radius) && radius > 0) {
                map.removeLayer(window.user_buffer_layer);
                window.user_buffer_layer = add_user_data_buffer(radius, unit, "#nature_buffer_layer");
            }
        });
        // update buffer unit
        window.user_buffer_table.find('#tmp_buffer_unit').on('change', function() {
            map.removeLayer(window.user_buffer_layer);
            unit = $(this).val();
            window.user_buffer_layer = add_user_data_buffer(radius, unit, "#nature_buffer_layer");
        });

        // show buffer table
        window.user_buffer_table.find('#tmp_buffer_button').on('click', function() {
            createUserDataBufferTable($(this));
        });


        $('#analysis_tools').append(window.user_buffer_table);
        window.user_buffer_table.show();

    } else if ($("#cc_buffer_layer").prop('checked') == true) {
        /*radius = 35;
        unit = 'meters';
         cc_buffer_layer = add_buffer_to_cc(radius, unit);
         $('#cc_buffer_radius').val(35);
         $('#cc_buffer_unit').val('meters');
         $("#cc_buffer_form").slideDown();*/

        var name = "Community Clubs";

        radius = 35;
        unit = 'meters';
        $('#tmp_buffer_radius').val(35);
        $('#tmp_buffer_unit').val('meters');

        window.user_buffer_layer = add_user_data_buffer(radius, unit, "#cc_buffer_layer");

        // create dynamic form
        window.user_buffer_table = $('#template_buffer_form').clone();

        //modify the template buffer form, but in this case, no need, as I user assume to use one buffer form at a time only
        /*window.user_buffer_table.attr('id', window.current_layer_name+'_buffer_form');
        window.user_buffer_table.find('#tmp_buffer_radius').attr()*/
        window.user_buffer_table.attr('id', 'current_form');
        window.user_buffer_table.find("#label_radius").text(name + " buffer radius:");
        window.user_buffer_table.find("#label_unit").text(name + " buffer unit:");


        //attach event listener to form elements
        // update buffer radius
        window.user_buffer_table.find('#tmp_buffer_radius').on('input propertychange paste', function() {
            radius = $(this).val();
            if ($.isNumeric(radius) && radius > 0) {
                map.removeLayer(window.user_buffer_layer);
                window.user_buffer_layer = add_user_data_buffer(radius, unit, "#cc_buffer_layer");
            }
        });
        // update buffer unit
        window.user_buffer_table.find('#tmp_buffer_unit').on('change', function() {
            map.removeLayer(window.user_buffer_layer);
            unit = $(this).val();
            window.user_buffer_layer = add_user_data_buffer(radius, unit, "#cc_buffer_layer");
        });

        // show buffer table
        window.user_buffer_table.find('#tmp_buffer_button').on('click', function() {
            createUserDataBufferTable($(this));
        });


        $('#analysis_tools').append(window.user_buffer_table);
        window.user_buffer_table.show();

    } else if ($("#lib_buffer_layer").prop('checked') == true) {
        /*radius = 35;
        unit = 'meters';
        lib_buffer_layer = add_buffer_to_lib(radius, unit);
        $('#lib_buffer_radius').val(35);
        $('#lib_buffer_unit').val('meters');
        $("#lib_buffer_form").slideDown();*/

        var name = "Library";

        radius = 35;
        unit = 'meters';
        $('#tmp_buffer_radius').val(35);
        $('#tmp_buffer_unit').val('meters');

        window.user_buffer_layer = add_user_data_buffer(radius, unit, "#lib_buffer_layer");

        // create dynamic form
        window.user_buffer_table = $('#template_buffer_form').clone();
        window.user_buffer_table.attr('id', 'current_form');

        //modify the template buffer form, but in this case, no need, as I user assume to use one buffer form at a time only
        /*window.user_buffer_table.attr('id', window.current_layer_name+'_buffer_form');
        window.user_buffer_table.find('#tmp_buffer_radius').attr()*/
        window.user_buffer_table.find("#label_radius").text(name + " buffer radius:");
        window.user_buffer_table.find("#label_unit").text(name + " buffer unit:");


        //attach event listener to form elements
        // update buffer radius
        window.user_buffer_table.find('#tmp_buffer_radius').on('input propertychange paste', function() {
            radius = $(this).val();
            if ($.isNumeric(radius) && radius > 0) {
                map.removeLayer(window.user_buffer_layer);
                window.user_buffer_layer = add_user_data_buffer(radius, unit, "#lib_buffer_layer");
            }
        });
        // update buffer unit
        window.user_buffer_table.find('#tmp_buffer_unit').on('change', function() {
            map.removeLayer(window.user_buffer_layer);
            unit = $(this).val();
            window.user_buffer_layer = add_user_data_buffer(radius, unit, "#lib_buffer_layer");
        });

        // show buffer table
        window.user_buffer_table.find('#tmp_buffer_button').on('click', function() {
            createUserDataBufferTable($(this));
        });


        $('#analysis_tools').append(window.user_buffer_table);
        window.user_buffer_table.show();

    }
});
