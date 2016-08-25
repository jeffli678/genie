"use strict";
var $action = $action || {};
(function ($action) {
    class AudioUICommandItem extends $action.CommandItem {
        constructor(command) {
            super(command);
            this.init();
        }

        get DOM() {
            return this._domElement;
        };

        init() {
            // Initialize the UI for the CommandItem corresponding to each command
            this._tagName = this.Command.Element.tagName;
            var listItem = document.createElement("li");
            listItem.classList.add("genie-audio-ui-list-item");

            //  var labelSpan = document.createElement("span");
            var commandLabelSpan = document.createElement("span");
            commandLabelSpan.classList.add("genie-audio-ui-list-item-command");
            //   labelSpan.classList.add("genie-audio-ui-list-item-label");

            var label = this.label().split(",");
          /*  var rest = "";
            var first = "";
            if (label.length) {
                first = label[0]; // The first chunk of the label goes in a separate element so it can be bolded as the command string
                rest = _.drop(label, 1); // The second chunk of the label is the rest
            }
            //labelSpan.textContent = rest;*/
            commandLabelSpan.textContent = label;

            listItem.appendChild(commandLabelSpan);
            //  listItem.appendChild(labelSpan);

            this._domElement = listItem;
        }
    };

    $action.AudioUICommandItem = AudioUICommandItem;

    class AudioUI extends $action.UI {
        constructor() {
            super();
            this.init();

            // Keep a map between the command labels and their execute() calls so that we can map audio commands to call commands
            this._audioCommands = {};
            this.Root = this.dialog;
        }

        init() {
            var dialog = document.createElement("div");
            $(dialog).attr("id", "genie-audio-ui");
            var list = document.createElement("ul");
            list.classList.add("genie-audio-ui-list");

            var label = document.createElement("div");
            label.classList.add("genie-audio-ui-header");


            dialog.appendChild(label);
            dialog.appendChild(list);
            $('html').append(dialog);

            this.dialog = dialog;
            this.list = list;
            this.label = label;

            this.label.textContent = "Speak a command... ";

            // Attach the sidebar to the span link
            /* $('body').sidr({
                side: 'right',
                name: 'genie-audio-ui-sidebar',
                displace: true,
                renaming: false
            });
*/
        };

        mapResultsToCommand(speechResults) {
            // Speech results are are in the results property
            for (var i = 0; i < speechResults.length; i++) {
                let result = speechResults[i];
                // Result will have a set of SpeechRecognitionAlternative objects. Find the first one with > .90 confidence rate. 
                for (var j = 0; j < result.length; j++) {
                    let alternative = result[j];
                    console.log(alternative.transcript);
                    // Execute the command
                    let commandText = alternative.transcript.trim().toLowerCase();
                    console.log(commandText);

                    // Find the commands corresponding execute() method in the commandsMap
                    let command = this._audioCommands[commandText];
                    if (command) {
                        // Call the execute method to perform the command
                        command.execute();
                    }
                }
            }
        }

        appendCommandGroup(label, commands) {
            var group = document.createElement('li');
            group.classList.add('genie-audio-ui-group');

            var menulabel = document.createElement('span');
            menulabel.classList.add('genie-audio-ui-group-label');

            var label = pluralize.plural(label);
            menulabel.textContent = label[0].toUpperCase() + label.substring(1, label.length);
            group.appendChild(menulabel);

            var list = document.createElement('ul');
            list.classList.add('genie-audio-ui-list');

            // Groups
            var commandItems = [];
            for (var i = 0; i < commands.length; i++) {
                var newCommand = new $action.AudioUICommandItem(commands[i]);
                commands[i].CommandItem = newCommand;

                if (!commands[i].userInvokeable()) {
                    newCommand.DOM.classList.add('genie-audio-ui-disabled');
                }

                let commandLabel = newCommand.label().toLowerCase();
                this._audioCommands[commandLabel] = newCommand.Command;
                commandItems.push(newCommand);
            }

            // Sort the list of commands alphabetically
            commandItems.sort(function (a, b) {
                var nameA = a.firstImperativeLabel().toLowerCase(),
                    nameB = b.firstImperativeLabel().toLowerCase()
                if (nameA < nameB) //sort string ascending
                    return -1
                if (nameA > nameB)
                    return 1
                return 0 //default return value (no sorting)
            })

            for (var i = 0; i < commandItems.length; i++) {
                list.appendChild(commandItems[i].DOM);
            }

            group.appendChild(list);

            this.list.appendChild(group);

            // Initialze speech recognition
         /*   this._recognition = new webkitSpeechRecognition();
            this._recognition.continuous = true;
            this._recognition.interimResults = true;
            this._recognition.lang = "en-US";
            var self = this;
            this._recognition.onresult = function (event) {
                self.mapResultsToCommand(event.results);
            }
            this._recognition.start();*/
        }

        /**
         * Remove a command from the dialog
         */
        removeCommand(command, commandCount) {
            var cmdItem = command.CommandItem;
            if (cmdItem && cmdItem.DOM) {
                this.list.removeChild(cmdItem.DOM);
            }
        }
    };

    $action.AudioUI = AudioUI;
})($action);