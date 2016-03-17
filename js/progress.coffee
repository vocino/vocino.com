---
# Progress Bar
---

$(document).ready ->

  getMax = ->
    $(document).height() - $(window).height()

  getValue = ->
    $(window).scrollTop()

  if 'max' of document.createElement('progress')
    # Browser supports progress element
    progressBar = $('progress')
    # Set the Max attr for the first time
    progressBar.attr max: getMax()
    $(document).on 'scroll', ->
      # On scroll only Value attr needs to be calculated
      progressBar.attr value: getValue()
      return
    $(window).resize ->
      `var progressBar`
      # On resize, both Max/Value attr needs to be calculated
      progressBar.attr
        max: getMax()
        value: getValue()
      return
  else
    progressBar = $('.progress-bar')
    max = getMax()
    value = undefined
    width = undefined

    getWidth = ->
      # Calculate width in percentage
      value = getValue()
      width = value / max * 100
      width = width + '%'
      width

    setWidth = ->
      progressBar.css width: getWidth()
      return

    $(document).on 'scroll', setWidth
    $(window).on 'resize', ->
      # Need to reset the Max attr
      max = getMax()
      setWidth()
      return
  return
