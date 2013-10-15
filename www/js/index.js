/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        // do your thing!
        // request the persistent file system
        app.downloadFile();

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    /////
        downloadFile: function(){
            alert('download it!');
            window.requestFileSystem(
                         LocalFileSystem.PERSISTENT, 0, 
                         function onFileSystemSuccess(fileSystem) {
                         fileSystem.root.getFile(
                                     "dummy.mov", {create: true, exclusive: false}, 
                                     function gotFileEntry(fileEntry){
                                     var sPath = fileEntry.fullPath.replace("dummy.mov","");
                                     var fileTransfer = new FileTransfer();
                                     fileEntry.remove();
                                     fileTransfer.onprogress = function(progressEvent) {
                                       // var perc = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                                        app.showMsg(progressEvent);
                                        
                                    };
                                     fileTransfer.download(
                                               "http://www.hitl.washington.edu/people/le101/fun/mov/jackal.mov",
                                              // "http://www.hitl.washington.edu/people/le101/fun/mov/travis_02.MOV",
                                               sPath + "theFile.mov",
                                               function(theFile) {
                                                   console.log("download complete: " + theFile.toURI());
                                                   app.showLink(theFile.toURI());
                                               },
                                               function(error) {
                                                   console.log("download error source " + error.source);
                                                   console.log("download error target " + error.target);
                                                   console.log("upload error code: " + error.code);
                                               }
                                               );
                                    
                                     }, 
                                     fail);
                         }, 
                         fail);
        
        },
        showLink: function(url){
            alert(url);
            var divEl = document.getElementById("fMsg");
            var aElem = document.createElement("a");
            aElem.setAttribute("target", "_blank");
            aElem.setAttribute("href", url);
            aElem.appendChild(document.createTextNode('PLAY ME'))
            divEl.appendChild(aElem);
        
        },
        showMsg: function(progressEvent){
            var statusDom = document.getElementById("fMsg");
         
            if (progressEvent.lengthComputable) {
                var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                statusDom.innerHTML = perc + "% loaded...";
                    
                    if(perc >= 100){
                        var aElem = document.createElement("a");
                        aElem.setAttribute("target", "_blank");
                         aElem.setAttribute("href", url);
                        aElem.appendChild(document.createTextNode('----Done----'))
                        statusDom.appendChild(aElem);
                    }

                } else {
                if(statusDom.innerHTML == "") {
                statusDom.innerHTML = "Loading";
             } else {
                statusDom.innerHTML += ".";
                }
            }
            
        
        }
        ,
        fail: function(evt) {
            console.log(evt.target.error.code);
        }
        
       
    ////
    
};
