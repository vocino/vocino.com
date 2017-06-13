---
# Primary coffeescript file for custom stuff
---

$(document).ready ->

  # Check Twitch live status
  $.getJSON 'https://api.twitch.tv/kraken/streams/vocino?client_id={{ site.twitch.client_id }}', (c) ->
    if c.stream == null
      console.log 'Offline'
    else
      console.log 'Online'
    return

  $.ajax
    # url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent'
    url: 'https://api.instagram.com/v1/users/self/media/recent'
    dataType: 'jsonp'
    type: 'GET'
    data:
      access_token: '{{ site.instagram.access_token }}'
      count: 10
    success: (data) ->
      console.log data
      for x of data.data
        `x = x`
        $('.projects').append '<div class="project col s12 m4 l3"><a href="' + data.data[x].link + '"><img src="' + data.data[x].images.standard_resolution.url + '" class="responsive-img"></div>'
        $('.projects').each ->
          $ul = $(this)
          $liArr = $ul.children('.project')
          $liArr.sort((a, b) ->
            temp = parseInt(Math.random() * 10)
            isOddOrEven = temp % 2
            isPosOrNeg = if temp > 5 then 1 else -1
            isOddOrEven * isPosOrNeg
          ).appendTo $ul
          return
        return
      return
    error: (data) ->
      console.log data
      return

  # Randomize the list
