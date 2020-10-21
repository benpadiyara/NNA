({
    handleEvent : function(component, event, helper) {
        var a=event.getParam('recordId');
        console.log("In Aura "+a);
        component.set("v.id",a);
    }
})