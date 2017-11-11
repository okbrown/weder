# ############################################################################
# wtw api for getting weather information for wtw-ui
# ############################################################################

FROM node:8
MAINTAINER Orlando Brown <iam@orlandobrown.uk>
ENV NODE_ENV=production

COPY . /data
WORKDIR /data

EXPOSE 7901
CMD ["bash"]
