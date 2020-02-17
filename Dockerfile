FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["AppSage/AppSage.csproj", "AppSage/"]
COPY ["BusinessLibrary/BusinessLibrary.csproj", "BusinessLibrary/"]
COPY ["DataAccessLibrary/DataAccessLibrary.csproj", "DataAccessLibrary/"]
RUN dotnet restore "AppSage/AppSage.csproj"
COPY . .
WORKDIR "/src/AppSage"
RUN dotnet build "AppSage.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "AppSage.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "AppSage.dll"]