FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine AS build-env
WORKDIR /app
COPY *.csproj ./
RUN dotnet restore
COPY . ./
RUN dotnet publish -c Release -o out
FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine AS runtime
WORKDIR /app
COPY --from=build-env /app/out ./
EXPOSE 8080
ENV ASPNETCORE_URLS=http://*:8080
RUN apk add icu-libs
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
ENTRYPOINT ["dotnet", "EindProjectCloudApi.dll"]