export const stickers = [
    {
        id: "1",
        url: require('../Images/clindoeil.png'),
        width: 150,
        height: 150
    },
    {
        id: '2',
        url: require('../Images/weird.png'),
        width: 200,
        height: 150
    },
    {
        id: '3',
        url: require('../Images/renard.jpg'),
        width: 120,
        height: 150
    },
    {
        id: '4',
        url: require('../Images/elf.png'),
        width: 120,
        height: 150
    },
    {
        id: '5',
        url: require('../Images/animal.png'),
        width: 120,
        height: 150
    }
];

export const configs = {
    Auth: {
        region: 'us-east-2',
        userPoolId: 'us-east-2_VgkxVtNIq',
        userPoolWebClientId: '6oe8l0f5sarangjassslpj61bl'
    },
    API: {
        endpoints: [
            {
                name: "Camagru",
                endpoint: "https://qffrfbpwie.execute-api.us-east-2.amazonaws.com/dev"
            }
        ]
    },
    Storage: {
        AWSS3: {
            bucket: 'camagru-dev', //REQUIRED -  Amazon S3 bucket
        }
    }
};