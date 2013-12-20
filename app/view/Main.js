Ext.define('Contact', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['who', 'message']
    }
});

var store = Ext.create('Ext.data.Store', {
   model: 'Contact',
   data: [
       { who: 'Me',   message: 'hello me'  },
              { who: 'Other',   message: 'hello other'  },
   ]
});


Ext.define('Chat.view.Main', {
    extend: 'Ext.dataview.DataView',
    xtype: 'main',
   
    config: {
        fullscreen:true,
        id :'main',
        scrollToTopOnRefresh:false,
        styleHtml:true,
        itemTpl: new Ext.XTemplate(
'<tpl for=".">'+
'<tpl if="this.isMe(who)">'+
            '<div class="leftd"> '+
  '<div class="speech left" >{message}</div>'+
'</div>'+
'<tpl else>'+
'<div class="rightd">'+
'<div class="rightimg"> </div>'+
'<div class="speech right">{message}</div></div>'+
'</tpl>'+
'</tpl>',
{
    isMe:function(who)
    {
        return who != 'Me';
    }

}),
    store: store,
    items: [
    {
      xtype:'panel',
      id:'viewpanl',
      hidden:false,
      docked:'bottom',
      layout: 'vbox',
      items:
      [
      {
            xtype: 'panel',
            html:'a',
            items:[
            { xtype:'button', text:'a' ,margin: 2},
       { xtype:'button', text:'a' ,margin: 2},
        { xtype:'button', text:'a',margin: 2},
         { xtype:'button', text:'a',margin: 2},
            ],
            flex: 1
        },
        {
            xtype: 'panel',
            html:'b',
             items:[
            { xtype:'button', text:'a' ,margin: 2},
       { xtype:'button', text:'a' ,margin: 2},
        { xtype:'button', text:'a',margin: 2},
         { xtype:'button', text:'a',margin: 2},
            ],
            flex: 1
        }
      ]
    },
    {
        xtype:'toolbar',
        docked: 'top',
    },
    {
        xtype:'toolbar',
        docked:'bottom', 
         layout: {
                        pack: 'start',
                        align: 'start'
                    },
         defaults: {
                  
                    },
        items:[
        {
            iconCls:'add',
            ui:'plain',
            docked:'left',
            handler:function()
            {
              var field = Ext.getCmp('inputfield');
                 if(field.getValue() != "")
             {
                 var data =   
               { who: 'Me',   message: field.getValue() };
   
                  Ext.getCmp('main').getStore().addData(data);
                  Ext.getCmp('main').getStore().sync();
                  setTimeout(function(){Ext.getCmp('main').getScrollable().getScroller().scrollToEnd();},100);
                   field.setValue("");
            }
          }
        },      
        {
           
                     xtype: 'textfield',
                     id:'inputfield',
                    width:'100%',
                    listeners:
                    {
                      keyup:function(field,e)
                      {
                               var keyCode = e.event.keyCode;
                               if(keyCode == 13 && field.getValue() != "")
                               {
                               
                                var data =   
      { who: 'Me',   message: field.getValue() };
                  Ext.getCmp('main').getStore().addData(data);
                  Ext.getCmp('main').getStore().sync();
                  setTimeout(function(){Ext.getCmp('main').getScrollable().getScroller().scrollToEnd();},100);
                  field.setValue("");
                               }
                      },
  
                      focus:function()
                      {
                        Ext.getCmp('viewpanl').setHidden(false);
                      },
                      blur:function()
                      {
                        Ext.getCmp('viewpanl').setHidden(true);
                      }

                    }
                    
        },
         {
            iconCls:'reply',
             ui:'plain',
            docked:'right',
            handler:function()
            {
                var field = Ext.getCmp('inputfield');
               if(field.getValue() != "")
             {
                var data =   
      { who: 'Other',  message: field.getValue() };
   
                  Ext.getCmp('main').getStore().addData(data);
                  Ext.getCmp('main').getStore().sync();
                  setTimeout(function(){Ext.getCmp('main').getScrollable().getScroller().scrollToEnd();},100);
                   field.setValue("");
            }
          }
        },
        ]
    },
    ]  
        
    }
});
