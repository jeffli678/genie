"use strict";
var $action = $action || {};
(function ($action) {
    class HelpUI extends $action.UI {
        constructor() {
            // Keep a map between the command labels and their execute() calls so that we can map audio commands to call commands
            super();
            this.init();
            this._tooltips = {};
        }

        init() {

        };

        hide() {
            // Hide all of the tooltips
            var keys = Object.keys(this._tooltips);
            for (var i = 0; i < keys.length; i++) {
                let element = $action.getElementFromID(keys[i]);
                let tooltip = this._tooltips[keys[i]];
                if (tooltip && element) {
                    tooltip.hide();
                }
            }
        }

        show() {
            var keys = Object.keys(this._tooltips);
            for (var i = 0; i < keys.length; i++) {
                let element = $action.getElementFromID(keys[i]);
                let tooltip = this._tooltips[keys[i]];
                if (tooltip && element) {
                    tooltip.show();
                }
            }
        }

        appendCommandGroup(label, commands) {
            for (var i = 0; i < commands.length; i++) {
                var newCommand = new $action.CommandItem(commands[i]);
                commands[i].CommandItem = newCommand;

                // When a command gets added, add a glowing border around the command element
                var commandElement = commands[i].Element;

                if (commandElement instanceof Window || commandElement instanceof Document) {
                    commandElement = document.body;
                }

                // Attach a tooltip to the command
                // Look for a tooltip already
                var tooltipSelector = "#genie-help-ui-tooltip-" + commands[i].ElementID;
                var tooltip = $(tooltipSelector);
                if (tooltip.length) {
                    // Update the text
                } else {
                    var commandLabel = 
                    this.createTooltip(commands[i], newCommand.firstImperativeLabel(), newCommand.descriptionLabel());
                }

                // How to handle when element has multiple commands? 
            }
        }

        getTooltip(command) {
            return this._tooltips[command.ElementID];
        }
        
        arguments(argumentsMap) {
            var keys = Object.keys(argumentsMap);
            var argString = ""; 
            for(var i=0; i<keys.length; i++){
                argString = argString + keys[i] + ": " + argumentsMap[keys[i]]; 
                if(i < keys.length -1){
                    argString = argString + ",";
                }
            }
            
            return argString;
        }

        createTooltip(command, commandLabel, description) {
            // Initialize the tooltip
            // Look for a tooltip already attached
            var existingTooltip = this.getTooltip(command);
            if (!existingTooltip) {
                var $element = $(command.Element);
                var tooltip = new Opentip($element, {
                    background: '#f5f5f5', 
                    borderColor: '#f5f5f5',
                    showOn: null,
                    target: $element,
                    tipJoint: "bottom left",
                    hideTriggers: [],
                    className: "genie-help-ui-tooltip"
                });
                
                var label = commandLabel + ": " + description; 
                
                var commandArguments = this.arguments(command.ArgumentsMap); 
                if(commandArguments && commandArguments.length) {
                    label = label + ", " + commandArguments;
                }
                tooltip.setContent(label);
                // tooltip.setAttribute("id", "genie-help-ui-tooltip-" + command.ElementID);
                // tooltip.classList.add("genie-help-ui-tooltip");
                this._tooltips[command.ElementID] = tooltip;
            } else {

            }
        }
    };

    $action.HelpUI = HelpUI;
})($action);