document.observe('dom:loaded',
function()
{
  loadAccordions();
});
function loadAccordions() {
	
  $$('.vertical_accordion').each(function(topEl) {
    var verticalAccordion = new Accordion(topEl, {
        toggleClass : 'vertical_accordion_toggle',
        toggleActive : 'vertical_accordion_toggle_active',
        contentClass : 'vertical_accordion_content'
    });
  });

}