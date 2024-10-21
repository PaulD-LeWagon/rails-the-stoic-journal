class LogsController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :today ]

  def today
    @lorem_ipsum_sentences = [ "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Nullam porttitor, est ut bibendum ultricies, odio odio pulvinar lectus, vitae convallis nunc quam quis dui.", "Curabitur nec felis risus.", "Proin non porttitor neque, a efficitur diam.", "Aliquam maximus lacus vitae nisl aliquet, ac elementum nulla lobortis.", "In venenatis euismod volutpat.", "Nam aliquam aliquam purus varius congue.", "Mauris id suscipit erat.", "Curabitur sodales facilisis vehicula.", "Nam faucibus euismod lectus, in efficitur sapien placerat tempor.", "Vestibulum hendrerit efficitur risus, sed semper lacus tincidunt sed.", "Maecenas a tellus vitae purus lobortis viverra lobortis sit amet ex.", "Phasellus auctor orci bibendum, tristique ex at, fermentum sem.", "Suspendisse non nunc imperdiet, aliquet sapien in, imperdiet felis.", "Sed at aliquet mi.", "Ut convallis porttitor augue, vel rutrum turpis sagittis eu.", "Aliquam et lacus lacus.", "Cras sed maximus dui, vel pretium odio.", "Phasellus gravida nisi non elit ultricies, ac varius ligula gravida.", "Nullam non odio leo.", "Cras eu consectetur sem, nec aliquam velit.", "Aliquam pharetra nibh id vestibulum luctus.", "Aliquam vulputate magna purus, at convallis sapien ullamcorper sit amet." ]
    @lorem_ipsum_words = %w( Lorem ipsum dolor consectetur adipiscing elit Nullam porttitor est ut bibendum ).map { |w| w.capitalize }
  end

  def weekly

  end

  def monthly

  end

  def future

  end
end
