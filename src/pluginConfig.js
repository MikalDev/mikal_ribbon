// WARNING: DO NOT EDIT THIS FILE, IT IS AUTOGENERATED
/** @type {import("c3ide2-types").Plugin} */
const Config = {
    addonType: "plugin",
    id: "mikal_ribbon",
    name: "ribbon",
    version: "1.0.3",
    category: "3d",
    author: "mikal",
    website: "https://www.construct.net",
    documentation: "https://www.construct.net",
    description: "Description",
    // addonUrl: "https://www.construct.net/en/make-games/addons/####/XXXX", // displayed in auto-generated docs
    // githubUrl: "https://github.com/skymen/XXXX", // displays latest release version in auto-generated docs
    // icon: "icon.svg", // defaults to "icon.svg" if omitted
    type: "world", // world, object, dom
    domSideScripts: [
        // "domSide.js", // no need to include "c3runtime/" prefix
    ],
    /* extensionScript: {
    enabled: false, // set to false to disable the extension script
    watch: false, // set to true to enable live reload on changes during development
    targets: [
      "x86",
      "x64",
      // "ARM64", // Disabled for now because the provided base project doesn't support it
    ],

    // you don't need to change this, the build step will rename the dll for you. Only change this if you change the name of the dll exported by Visual Studio
    name: "MyExtension",
  }, */
    fileDependencies: [
        /*
    {
      filename: "filename.js", // no need to include "c3runtime/" prefix
      type:
        "copy-to-output"
        "inline-script"
        "external-dom-script"
        "external-runtime-script"
        "external-css"

      // for copy-to-output only
      // fileType: "image/png"
    }
    */
    ],
    info: {
        // world only
        defaultImageUrl: null,
        Set: {
            // world only
            IsResizable: false,
            IsRotatable: false,
            Is3D: true,
            HasImage: true,
            IsTiled: false,
            SupportsZElevation: true,
            SupportsColor: true,
            SupportsEffects: true,
            MustPreDraw: false,

            // object only
            IsSingleGlobal: false,

            // world and object
            CanBeBundled: false,
            IsDeprecated: false,
            GooglePlayServicesEnabled: false,
        },
        AddCommonACEs: {
            // world only
            Position: true,
            SceneGraph: true,
            Size: true,
            Angle: true,
            Appearance: false,
            ZOrder: true,
        },
    },
    properties: [
        {
            type: "integer",
            id: "maxPoints",
            options: {
                initialValue: 10,
                interpolatable: false,
            },
            name: "Max Points",
            desc: "maximum number of points in the ribbon",
        },
        {
            type: "float",
            id: "startWidth",
            options: {
                initialValue: 1,
                interpolatable: false,
            },
            name: "Start Width",
            desc: "starting width of the ribbon",
        },
        {
            type: "float",
            id: "endWidth",
            options: {
                initialValue: 1,
            },
            name: "End Width",
            desc: "ending width of the ribbon",
        },
        {
            type: "float",
            id: "growthRate",
            options: {
                initialValue: 1,
            },
            name: "Growth Rate",
            desc: "rate at which the ribbon grows",
        },
    ],
    aceCategories: {
        // follows the format id: langName
        // in the ACEs refer to categories using the id, not the name
        ribbon: "Ribbon",
    },
    Acts: {
        UpdateQuaternion: {
            category: "ribbon",
            forward: "_UpdateQuaternion",
            autoScriptInterface: true,
            highlight: true,
            deprecated: false,
            isAsync: false,
            params: [
                {
                    id: "quaternion",
                    name: "Quaternion",
                    desc: "the rotation quaternion as a string",
                    type: "string",
                    initialValue: "0,0,0,1",
                },
            ],
            name: "Update Quaternion",
            listName: "Update Quaternion",
            displayText: "Update Quaternion [i]{0}[/i]",
            description: "Updates the quaternion of the ribbon",
        },
        /*
    SampleAction: {
      // The category of the action as it appears in the add action dialog
      category: "general",

      // Forward to the instance function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this action
      // Cases where you might not want this are:
      // 1- If the action params are incompatible with the script interface
      // 2- If you don't want it to appear in the script interface
      // 3- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the action in the add action dialog
      highlight: true,

      // Set to true to hide the action in the interface. False by default if not specified.
      deprecated: false,

      // Marks the action as async. Defaults to false if not specified.
      isAsync: false,

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
            - "boolean"

            // The following types can take a default value but CANNOT be automatically generated in the script interface
            - "combo"

            // The following types CANNOT take a default value AND CANNOT be automatically generated in the script interface
            - "cmp"
            - "object"
            - "objectname"
            - "layer"
            - "layout"
            - "keyb"
            - "instancevar"
            - "instancevarbool"
            - "eventvar"
            - "eventvarbool"
            - "animation"
            - "objinstancevar"

          // The default value of the parameter. Can be omitted if the type is not a string, number, any, boolean or combo.
          initialValue: "the default value of the parameter",

          // Only for type "combo"
          items: [
            {"itemId1": "itemName1"},
            {"itemId2": "itemName2"},
            {"itemId3": "itemName3"},
          ],

          // Only for type "object"
          allowedPluginIds: ["Sprite", "TiledBg"],
        },
      ],

      // The name of the action as it appears in the add action dialog
      listName: "Sample Action",

      // The text that appears in the event sheet. Note, every single param must be used in the display text.
      // You can also use [b] and [i] tags.
      displayText: "Sample action [i]{0}[/i]",

      // The description of the action as it appears in the add action dialog
      description: "This is a sample action",
    },
    */
    },
    Cnds: {
        /*
    SampleCondition: {
      // The category of the action as it appears in the add condition dialog
      category: "general",

      // Forward to the instance function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this condition
      // Cases where you might not want this are:
      // 1- If the condition params are incompatible with the script interface
      // 2- If you don't want it to appear in the script interface
      // 3- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the condition in the add condition dialog
      highlight: true,

      // Set to true to hide the condition in the interface. False by default if not specified.
      deprecated: false,

      // special conditions properties. These can all be omitted, and they will default to the following values:
      isTrigger: false,
      isFakeTrigger: false,
      isStatic: false,
      isLooping: false,
      isInvertible: true,
      isCompatibleWithTriggers: true,

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
            - "boolean"

            // The following types can take a default value but CANNOT be automatically generated in the script interface
            - "combo"

            // The following types CANNOT take a default value AND CANNOT be automatically generated in the script interface
            - "cmp"
            - "object"
            - "objectname"
            - "layer"
            - "layout"
            - "keyb"
            - "instancevar"
            - "instancevarbool"
            - "eventvar"
            - "eventvarbool"
            - "animation"
            - "objinstancevar"

          // The default value of the parameter. Can be omitted if the type is not a string, number, any, boolean or combo.
          initialValue: "the default value of the parameter",

          // Only for type "combo"
          items: [
            {"itemId1": "itemName1"},
            {"itemId2": "itemName2"},
            {"itemId3": "itemName3"},
          ],

          // Only for type "object"
          allowedPluginIds: ["Sprite", "TiledBg"],
        },
      ],

      // The name of the condition as it appears in the add condition dialog
      listName: "Sample Condition",

      // The text that appears in the event sheet. Note, every single param must be used in the display text.
      // You can also use [b] and [i] tags.
      displayText: "Sample condition [i]{0}[/i]",

      // The description of the condition as it appears in the add condition dialog
      description: "This is a sample condition",
    },
    */
    },
    Exps: {
        /*
    SampleExpression: {
      // The category of the action as it appears in the expression picker
      category: "general",

      // Forward to the instance function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this expression
      // Cases where you might not want this are:
      // 1- If you don't want it to appear in the script interface
      // 2- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the expression in the expression picker
      highlight: true,

      // Set to true to hide the expression in the interface. False by default if not specified.
      deprecated: false,

      // The type of the expression.
      returnType:
        - "string"
        - "number"
        - "any" // must be either string or number

      // Set to true if the expression is variadic. False by default if not specified.
      isVariadicParameters: false

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
        },
      ],

      // The description of the expression as it appears in the expression picker
      description: "This is a sample expression",
    },
    */
    },
};

module.exports = Config;
