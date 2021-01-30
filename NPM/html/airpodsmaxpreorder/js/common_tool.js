function is_both_has_eng_and_num(p_text) {
    pattern_abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    pattern_num = "01234656789"
    var pos_abc = 0;
    var pos_num = 0;
    //alert(p_text.length);
    for (i = 0; i < p_text.length; i++) {
        pos_abc = pattern_abc.indexOf(p_text.charAt(i));       
        if (pos_abc > -1) {
            break;
        }
    }    
    //==============================================================
    for (i = 0; i < p_text.length; i++) {
        pos_num = pattern_num.indexOf(p_text.charAt(i));
        if (pos_num > -1) {
            break;
        }
    }
    //===============================================================
    //alert('pos_abc=  ' + pos_abc + ',' + 'pos_num=  ' + pos_num);
    if (pos_abc > -1 && pos_num > -1) {
        return true;
    }
    else {
        return false;
    } 
}